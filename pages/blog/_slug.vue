<template>
  <div>
    <div class="page-section pt-5">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ul class="breadcrumb p-0 mb-0 bg-transparent">
            <li class="breadcrumb-item">
              <a href="index.html">Home</a></li>
            <li class="breadcrumb-item">
              <a href="blog.html">Blog</a></li>
            <li class="breadcrumb-item active">Second divided from form fish beastr</li>
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
<!--              <div class="post-meta">-->
<!--                <div class="post-sharer">-->
<!--                  <a href="#" class="btn social-facebook"><span class="mai-logo-facebook-f"></span></a>-->
<!--                  <a href="#" class="btn social-twitter"><span class="mai-logo-twitter"></span></a>-->
<!--                  <a href="#" class="btn social-linkedin"><span class="mai-logo-linkedin"></span></a>-->
<!--                  <a href="#" class="btn"><span class="mai-mail"></span></a>-->
<!--                </div>-->
<!--              </div>-->
              <div class="post-content" v-html="renderedContent" />
            </div>

            <div class="tag-clouds">
              <a href="#" class="tag-cloud-link">Projects</a>
              <a href="#" class="tag-cloud-link">Design</a>
              <a href="#" class="tag-cloud-link">Travel</a>
              <a href="#" class="tag-cloud-link">Brand</a>
              <a href="#" class="tag-cloud-link">Trending</a>
              <a href="#" class="tag-cloud-link">Knowledge</a>
              <a href="#" class="tag-cloud-link">Food</a>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="widget">
              <div class="widget-box">
                <h4 class="widget-title">Category</h4>
                <div class="divider"></div>

                <ul class="categories">
                  <li><a href="#">LifeStyle</a></li>
                  <li><a href="#">Food</a></li>
                  <li><a href="#">Healthy</a></li>
                  <li><a href="#">Sports</a></li>
                  <li><a href="#">Entertainment</a></li>
                </ul>
              </div>

              <!-- Widget recent post -->
              <div class="widget-box">
                <h4 class="widget-title">Related articles</h4>
                <div class="divider"></div>
                <RelatedBlogCard v-if="relatedBlogs.length>0" :blog="relatedBlog" v-for="(relatedBlog,index) in relatedBlogs" :key="index" />
              </div>
          </div>
        </div>
      </div>
        <div class="container">
          <h4 class="widget-title">Related articles</h4>
          <div class="divider"></div>
          <div class="row">
            <BlogOverviewCard v-if="relatedBlogs.length>0" :blog="relatedBlog"
                              class="col-sm-12 col-md-4"
                              v-for="(relatedBlog,index) in relatedBlogs" :key="index" />
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
  layout: 'detail',
  async asyncData({params}) {
    const blog = await client.getEntries({
      content_type: 'blog',
      'fields.slug': 'blog/' + params.slug
    })
    console.log(blog)
    return {
      blog: blog.items[0].fields,
      content: blog.items[0].fields.content
    }
  },
  computed: {
    renderedContent() {
      return documentToHtmlString(this.content);
    }
  },
  data() {
    return {
      relatedBlogs: []
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
