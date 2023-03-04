<template>
  <div class="blog-item">
    <nuxt-link :to="'/'+blog.fields.slug" class="post-thumb" href="">
      <img class="related-blog-img" :src="blog.fields.thumbnail.fields.file.url" :alt="blog.fields.title">
    </nuxt-link>
    <div class="content">
      <h6 class="post-title">
        <nuxt-link :to="'/'+blog.fields.slug" >
          {{blog.fields.title}}
        </nuxt-link>
      </h6>
      <div class="meta">
        <a href="#"><span class="mai-person"></span> Admin</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["blog"],
  name: "RelatedBlogCard"
}
</script>

<style>
.related-blog-img{
  width: 100%;
}
</style>
