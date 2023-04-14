require('dotenv').config()
const client = require('./plugins/contentful')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Experience Premier Health Services in Turkey - Transform Your Look Today',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'title',
        name: 'title',
        content: 'Experience Premier Health Services in Turkey - Transform Your Look Today'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Find information on medical treatments, hospitals, doctors, accommodation, and transportation in Turkey. Start planning your medical journey today!'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css'
      },
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  components: true,

  css: [
    '@/assets/css/bootstrap.css',
    '@/assets/css/maicons.css',
    '@/assets/css/theme.css',
    '@/assets/vendor/animate/animate.css',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  target: 'static',

  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: ['~/plugins/contentful'],
  modules: ['@nuxtjs/dotenv', '@nuxtjs/markdownit', '@nuxtjs/sitemap'],
  markdownit: {
    injected: true
  },
  generate: {
    routes() {
      return client.getEntries({content_type: 'blog'}).then(entries => {
        return entries.items.map(entry => {
          return {
            route: entry.fields.slug,
            payload: entry
          }
        })
      })
    }
  },
  sitemap: {
    hostname: 'https://healthservicesinturkey.com',
    routes: async () => {
      const {items} = await client.getEntries({content_type: 'blog'})
      return items.map(post => ({
        url: `/${post.fields.slug}`,
        lastmod: post.sys.updatedAt,
        changefreq: 'weekly',
        priority: 0.8,
      }))
    }
  }

}
