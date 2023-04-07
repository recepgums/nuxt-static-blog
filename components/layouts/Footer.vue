<template>
  <footer class="page-footer bg-image" :style="{ backgroundImage: 'url(/img/world_pattern.svg)' }">
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-3 py-3">
          <h3>Health Services in <span class="text-primary">Turkey</span></h3>
          <p>We are committed to providing you with accurate, reliable, and up-to-date information on medical treatments, hospitals, doctors, accommodation, and transportation in Turkey.</p>

          <div class="social-media-button" v-if="false">
            <a href="#"><span class="mai-logo-facebook-f"></span></a>
            <a href="#"><span class="mai-logo-twitter"></span></a>
            <a href="#"><span class="mai-logo-google-plus-g"></span></a>
            <a href="#"><span class="mai-logo-instagram"></span></a>
            <a href="#"><span class="mai-logo-youtube"></span></a>
          </div>
        </div>
        <div class="col-lg-3 py-3">
          <h5>Company</h5>
          <ul class="footer-menu">
            <li><NuxtLink to="/about">About Us</NuxtLink></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Help & Support</a></li>
          </ul>
        </div>
        <div class="col-lg-3 py-3">
          <h5>Contact Us</h5>
          <a href="#" class="footer-link">+00 1122 3344 5566</a>
          <a href="#" class="footer-link">info@healthservicesinturkey.com</a>
        </div>
        <div class="col-lg-3 py-3">
          <h5>Newsletter</h5>
          <p>Get updates, news or events on your mail.</p>
          <form action="#">
            <input type="text" class="form-control" placeholder="Enter your email..">
            <button type="submit" class="btn btn-success btn-block mt-2">Subscribe</button>
          </form>
        </div>
      </div>

      <p class="text-center" id="copyright">Copyright &copy; 2023. Health Services in Turkey</p>
    </div>
  </footer>
</template>

<script>
export default {
  name:'Footer'
}
</script>
