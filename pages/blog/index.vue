<template>
  <div class="div">

    <div class="container">
      <div class="page-banner home-banner">
        <div class="row ssss align-items-center flex-wrap-reverse h-100"
             style="background-image: url('img/banner_image_hsit.png'); ">
          <div class="col-md-6 py-5 wow fadeInLeft" style="visibility: visible; animation-name: fadeInLeft;">
            <h1 class="mb-4" style="color: #4332c7">World-Class Health Services in Turkey</h1>
            <h2 class="text-lg text-grey mb-5" style="font-weight: 600;color: black!important;"> Discover the Beauty of Turkey and Transform Your Look</h2>
            <NuxtLink to="/appointment" class="btn btn-primary btn-split">
              Get Appointment
              <div class="fab">
                <span class="mai-calendar">
                </span>
              </div>
            </NuxtLink>
          </div>
          <div class="col-md-6 py-5 wow zoomIn" style="visibility: visible; animation-name: zoomIn;">
          </div>
        </div>
        <a href="#second-section" class="btn-scroll" data-role="smoothscroll"><span class="mai-arrow-down"></span></a>
      </div>
    </div>

    <div class="page-section" id="second-section">
      <div class="container">
        <div class="row my-5">
          <div class="col-lg-4 col-sm-6 py-3" v-for="blog in blogs" :key="blog.id">
            <BlogOverviewCard :blog="blog"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from '@/plugins/contentful';
import BlogOverviewCard from "../../components/BlogOverviewCard.vue";

export default {
  components: {BlogOverviewCard},

  asyncData() {
    return client
      .getEntries({
        content_type: 'blog',
        order: '-sys.createdAt',
      })
      .then(entries => {
        return {blogs: entries.items};
      })
      .catch(e => console.log(e));
  },
};
</script>
<style>
.ssss {
  background-size: cover;
  background-position: center;
}
.second-section{
  padding-top:20px ;
}
</style>
