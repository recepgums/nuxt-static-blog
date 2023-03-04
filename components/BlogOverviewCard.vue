<template>
  <div class="card-blog">
    <div class="header">
      <nuxt-link :to="'/'+blog.fields.slug" class="post-thumb">
        <img :src="blog.fields.thumbnail.fields.file.url" alt="">
      </nuxt-link>
    </div>
    <div class="body">
      <h5 class="post-title">
        <nuxt-link :to="'/'+blog.fields.slug">{{blog.fields.title}}</nuxt-link>
      </h5>
      <div class="post-date">Posted on
        <nuxt-link to="#">27 Jan 2020</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["blog"],
  name: "BlogOverviewCard"
}
</script>

<style scoped>

</style>
