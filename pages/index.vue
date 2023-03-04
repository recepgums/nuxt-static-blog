<template>
  <div class="div">

    <div class="container">
      <div class="page-banner home-banner">
        <div class="row ssss align-items-center flex-wrap-reverse h-100"
             style="background-image: url('img/banner_image.jpg'); ">
          <div class="col-md-6 py-5 wow fadeInLeft" style="visibility: visible; animation-name: fadeInLeft;">
            <h1 class="mb-4">World-Class Health Services in Turkey</h1>
            <h2 class="text-lg text-grey mb-5"> Discover the Beauty of Turkey and Transform Your Look</h2>
<!--            <a href="#" class="btn btn-primary btn-split">Watch Video
              <div class="fab"><span class="mai-play"></span></div>
            </a>-->
          </div>
          <div class="col-md-6 py-5 wow zoomIn" style="visibility: visible; animation-name: zoomIn;">

          </div>
        </div>
        <a href="#second-section" class="btn-scroll" data-role="smoothscroll"><span class="mai-arrow-down"></span></a>
      </div>
    </div>

    <div class="page-section" id="second-section">
      <div class="container">
        <div class="row">
          <div class="col-sm-10">
            <form action="#" class="form-search-blog">
              <div class="input-group">
                <div class="input-group-prepend">
                  <select id="categories" class="custom-select bg-light">
                    <option>All Categories</option>
                    <option value="travel">Travel</option>
                    <option value="lifestyle">LifeStyle</option>
                    <option value="healthy">Healthy</option>
                    <option value="food">Food</option>
                  </select>
                </div>
                <input type="text" class="form-control" placeholder="Enter keyword..">
              </div>
            </form>
          </div>
          <div class="col-sm-2 text-sm-right">
            <button class="btn btn-secondary">Filter <span class="mai-filter"></span></button>
          </div>
        </div>

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
import client from '~/plugins/contentful';
import BlogOverviewCard from "../components/BlogOverviewCard";

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
</style>
