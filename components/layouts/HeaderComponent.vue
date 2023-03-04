<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky" data-offset="300">
      <div class="container">
        <nuxt-link to="/" class="navbar-brand">Health Services in <span class="text-primary" style="color: #3c7ec7!important;">Turkey</span></nuxt-link>

        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse collapsed" id="navbarContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/about">About</nuxt-link>
            </li>
<!--            <li class="nav-item">
              <nuxt-link class="btn btn-primary ml-lg-2" to="/about">Free Analytics</nuxt-link>
            </li>-->
          </ul>
        </div>

      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name:'HeaderComponent'
}
</script>
