<template>
  <div class="div">
    <div class="page-section">
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
          <div class="col-lg-4 py-3" v-for="blog in blogs" :key="blog.id">
            <BlogOverviewCard :blog="blog"/>
          </div>
        </div>
          <nav aria-label="Page Navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item active" aria-current="page">
                <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
              </li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
</template>

<script>
import client from '~/plugins/contentful';
import BlogOverviewCard from "../components/BlogOverviewCard";

export default {
  components: {BlogOverviewCard},

  asyncData({params}) {
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
  head: {
    title: 'Latest Posts',
  },
};
</script>
