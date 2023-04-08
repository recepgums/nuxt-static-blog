<template>
  <div>
    <div class="page-section pt-5">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ul class="breadcrumb p-0 mb-0 bg-transparent">
            <li class="breadcrumb-item">
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li class="breadcrumb-item">
              <nuxt-link to="/">Blog</nuxt-link>
            </li>
            <li class="breadcrumb-item active">{{ blog.title }}</li>
          </ul>
        </nav>
        <div class="row">
          <div class="col-lg-8">
            <div class="blog-single-wrap">
              <div class="header">
                <div class="post-thumb">
                  <img :src="blog.coverImage.fields.file.url" alt="">
                </div>
              </div>
              <h1 class="post-title">{{ blog.title }}</h1>
              <div class="post-content" v-html="renderedContent"/>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="widget">
              <!-- Widget recent post -->
              <div class="widget-box">
                <h4 class="widget-title">Related articles</h4>
                <div class="divider"></div>
                <RelatedBlogCard v-if="relatedBlogs.length>0" :blog="relatedBlog"
                                 v-for="(relatedBlog,index) in relatedBlogs" :key="index"/>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <h4 class="widget-title">Related articles</h4>
          <div class="divider"></div>
          <div class="row text-left">
            <BlogOverviewCard v-if="relatedBlogs.length>0" :blog="relatedBlog"
                              class="col-sm-12 col-md-4 my-1"
                              v-for="(relatedBlog,index) in relatedBlogs" :key="index"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from '~/plugins/contentful';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import RelatedBlogCard from "../../components/RelatedBlogCard";
import BlogOverviewCard from "../../components/BlogOverviewCard";

export default {
  components: {BlogOverviewCard, RelatedBlogCard},
  head() {
    const articleSchema = {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "headline": this.blog.title,
      "datePublished": this.sys.createdAt,
      "dateModified": this.sys.updatedAt,
      "author": {
        "@type": "Person",
        "url" : 'https://healthservicesinturkey.com/assets/img/person/admin.png',
        "name": 'Admin'
      },
      "image": {
        "@type": "ImageObject",
        "url": this.blog.thumbnail.fields.file.url,
        "width": this.blog.thumbnail.fields.file.details.image.width,
        "height": this.blog.thumbnail.fields.file.details.image.height
      },
      "publisher": {
        "@type": "Organization",
        "name": "Health Services in Turkey",
        "logo": {
          "@type": "ImageObject",
          "url": "https://healthservicesinturkey.com/favicon.ico",
          "width": 600,
          "height": 60
        }
      },
      "description": this.blog.metaDescription
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://healthservicesinturkey.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://healthservicesinturkey.com/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": this.blog.title,
          "item": "https://healthservicesinturkey.com/blog/dental-health-guide"
        }
      ]
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": this.blog?.faq?.map(x => {
        return {
          "@type": "Question",
          "name": x?.fields?.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": x?.fields?.answer
          }
        }
      })
    };

    return {
      title: this.blog.title,
      meta: [
        {hid: 'description', name: 'description', content: this.blog.metaDescription},
        {hid: 'og:title', property: 'og:title', content: this.blog.title},
        {hid: 'og:description', property: 'og:description', content: this.blog.metaDescription},
        {hid: 'og:image', property: 'og:image', content: this.blog.thumbnail.fields.file.url},
        {hid: 'twitter:title', name: 'twitter:title', content: this.blog.title},
        {hid: 'twitter:description', name: 'twitter:description', content: this.blog.metaDescription},
        {hid: 'twitter:image', name: 'twitter:image', content: this.blog.thumbnail.fields.file.url},
      ],
      script: [
        {
          hid: 'google-schema',
          type: 'application/ld+json',
          json: articleSchema
        },
        {
          hid: 'google-schema',
          type: 'application/ld+json',
          json: breadcrumbSchema
        },
        ...(this?.blog?.faq?.length > 0 ? [{
          hid: 'google-schema',
          type: 'application/ld+json',
          json: faqSchema
        }] : []),
      ]
    }
  },
  async asyncData({params}) {
    const blog = await client.getEntries({
      content_type: 'blog',
      'fields.slug': 'blog/' + params.slug
    })
    return {
      sys: blog.items[0].sys,
      blog: blog.items[0].fields,
      content: blog.items[0].fields.content,
    }
  },
  computed: {
    renderedContent() {
      let options = {
        renderNode: {
          'embedded-asset-block': (node) => {
            const { url, title, description } = node.data.target.fields.file;
            const mimeType = node.data.target.fields.file.contentType;

            // Use the URL and other fields to render an <img> element
            return `<img src="${url}" alt="${title}" title="${description}" type="${mimeType}" />`;
          },
        },
      };
      return documentToHtmlString(this.content,options);
    }
  },
  data() {
    return {
      relatedBlogs: [],
    }
  },
  mounted() {
    this.getRelatedBlogs()
  },
  methods: {
    async getRelatedBlogs() {
      await client.getEntries({
        content_type: 'blog',
        order: '-sys.createdAt',
      })
        .then(entries => {
          this.relatedBlogs = entries.items;
        })
    }

  }
};


</script>
<style>
.blog-single-wrap {
  padding: 0;
}

.post-thumb {
  height: 100% !important;
}
</style>
