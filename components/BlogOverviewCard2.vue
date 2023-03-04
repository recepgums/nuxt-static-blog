<template>
  <div class="post-card">
    <div class="post-card-cover">
      <nuxt-link :to="'/'+blog.fields.slug">
        <img :src="blog.fields.thumbnail.fields.file.url">
      </nuxt-link>
    </div>
    <div class="post-card-content">
        <h2 class="post-card-title">{{blog.fields.title}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props:["blog"],
  name: "BlogOverviewCard2"
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

.post-card-cover img {
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
