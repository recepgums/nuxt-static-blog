<template>
  <div class="card-blog">
    <div class="post-card-cover">
      <nuxt-link :to="'/'+blog.fields.slug" class="post-thumb">
        <img :src="blog.fields.thumbnail.fields.file.url" alt="">
      </nuxt-link>
    </div>
    <div class="body">
      <h5 class="post-title">
        <nuxt-link :to="'/'+blog.fields.slug">{{blog.fields.title}}</nuxt-link>
      </h5>
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

.post-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* Add other styles like width, padding, etc. */
}

.post-card {
  width: calc(33.33% - 10px);
  margin-bottom: 20px;
  /* Add other styles like padding, border, etc. */
}

.post-card-cover {
  position: relative;
  overflow: hidden;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.post-thumb img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-card-content {
  padding: 20px;
}

.post-card-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 24px;
}
</style>
