<template>
  <div class="tag-clouds">
    <nuxt-link :to="'/category/'+tag.slug" v-for="(tag,index) in tags" :key="index"
               class="tag-cloud-link">
      {{tag.name}}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "Tags"
}
</script>

<style scoped>

</style>
