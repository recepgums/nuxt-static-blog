<template>
  <div>
    <div class="page-section pt-5">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ul class="breadcrumb p-0 mb-0 bg-transparent">
            <li class="breadcrumb-item">
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li class="breadcrumb-item active">
              <nuxt-link to="/about">About</nuxt-link>
            </li>
          </ul>
        </nav>
          <div class="container">
            <div class="post-content" v-html="renderedContent"/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from '~/plugins/contentful';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';

export default {
  head() {
    return {
     /* title: this.blog.title,
      meta: [
        {hid: 'description', name: 'description', content: this.summary},
        {hid: 'og:title', property: 'og:title', content: this.blog.title},
        {hid: 'og:description', property: 'og:description', content: this.summary},
        {hid: 'og:image', property: 'og:image', content: this.blog.thumbnail.fields.file.url},
        {hid: 'twitter:title', name: 'twitter:title', content: this.blog.title},
        {hid: 'twitter:description', name: 'twitter:description', content: this.summary},
        {hid: 'twitter:image', name: 'twitter:image', content: this.blog.thumbnail.fields.file.url},
      ],*/
    }
  },
  async asyncData({params}) {
    const entries = await client.getEntries({
      content_type: 'pages',
      'fields.slug': 'about'
    })
    return {
      page: entries.items[0]
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
      return documentToHtmlString(this.page.fields.content,options);
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
