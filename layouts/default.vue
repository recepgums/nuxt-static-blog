<template>
  <div>
    <HeaderComponent/>
    <nuxt/>
    <Footer/>
  </div>
</template>
<script>
import HeaderComponent from '../components/layouts/HeaderComponent'
import Footer from '../components/layouts/Footer'
export default {
  name: 'MyComponent',
  components:{
    HeaderComponent,
    Footer
  },
  data() {
    return {
    }
  }
}
</script>
<style>
.page-section{}
</style>
