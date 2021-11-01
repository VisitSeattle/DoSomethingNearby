import redirectSSL from 'redirect-ssl'
export default {
  server: {
    port: process.env.PORT_NUMBER || 3000
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Do Something nearby. Get out, mask up, and support King County businesses.',
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      {
        hid: 'versatag-script',
        innerHTML: `(function(e, s, t) { t = t || {}, t.id = e, versaTagObj = { $: [], onready: function(e) { this.$.push(e) } }; var n = s.getElementsByTagName("script")[0], r = s.createElement("script"); r.options = t, r.async = !0, r.src = "https://secure-ds.serving-sys.com/SemiCachedScripts/ebOneTag.js?id=" + e, r.options = t, n.parentNode.insertBefore(r, n)    })("1073745552", document, { dataLayer:"SizmekDataLayer"    });`,
        type: 'text/javascript',
        charset: 'utf-8'
      },
      {
        hid: 'gtm-script',
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-FFGLWC0KDC'
      },
      {
        hid: 'gtm-script-content',
        innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-FFGLWC0KDC');`
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '    King County businesses need your support. So, find a new favorite and get out there, mask up, and Do Something. For yourself and for your community.' },
      {
        property: 'og:title',
        content: 'Do something fun nearby',
        hid: 'og:title'
      },
      {
        property: 'og:description',
        content: 'Find new favorites and support local businesses while you’re at it.',
        hid: 'og:description'
      },
      {
        property: 'og:image',
        content: process.env.BASE_URL + '/assets/VS_DoSomething_Share.jpg',
        hid: 'og:image'
      },
      {
        property: 'og:url',
        content: process.env.BASE_URL,
        hid: 'og:url'
      },
      {
        property: 'og:type',
        content: 'website',
        hid: 'og:type'
      },
      // {
      //   property: 'og:image:width',
      //   content: '1080',
      //   hid: 'og:image:width'
      // },
      // {
      //   property: 'og:image:height',
      //   content: '1080',
      //   hid: 'og:image:height'
      // },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
        hid: 'twitter:card'
      },
      {
        name: 'twitter:site',
        content: '@VisitSeattle',
        hid: 'twitter:site'
      },
      {
        name: 'twitter:title',
        content: 'Do Something Nearby',
        hid: 'twitter:title'
      },
      {
        name: 'twitter:description',
        content: 'I found some fun things to do nearby. Check them out! ',
        hid: 'twitter:description'
      },
      {
        name: 'twitter:image',
        content: process.env.BASE_URL + '/assets/VS_DoSomething_Share.jpg',
        hid: 'twitter:image'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'apple-touch-icon-precomposed', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-chrome-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon/android-chrome-512x512.png' }
    ]
  },
  // Bootstrap default styles are being overriden here
  // Here: /assets/scss/custom-bootstrap-variables.scss
  // and loaded in scss here:
  // /assets/scss/main.scss
  bootstrapVue: {
    // Overrideds the default inclusion of bootstrap styles
    // https://bootstrap-vue.org/docs/#getting-started-with-nuxtjs
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // Bootstrap scss global main loaded here
    '~/assets/scss/main.scss'
  ],

  /**
   * SCSS  Global Variables and Resources available to sass single file components
   */
  styleResources: {
    // Importing sass Variables for all components
    sass: [
      '~/assets/scss/variables-mixins.scss'
    ]
  },

  serverMiddleware: [
    '~/node-scripts/api',
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production',
      redirectHost: process.env.BASE_URL_REDIRECT
    })
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/vue-cookies.js', mode: 'client' },
    { src: '~/plugins/polyfill.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://github.com/nuxt-community/style-resources-module#readme
    '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://bootstrap-vue.org/docs
    'bootstrap-vue/nuxt'
  ],
  // Environment variables
  publicRuntimeConfig: {
    CACHE_TIMEOUT: process.env.CACHE_TIMEOUT,
    BASE_URL: process.env.BASE_URL
  },
  privateRuntimeConfig: {
    IMPORT_PASSWORD: process.env.IMPORT_PASSWORD,
    CTF_BUSINESS_TYPE_ID: process.env.CTF_BUSINESS_TYPE_ID,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_PREVIEW_ACCESS_TOKEN: process.env.CTF_PREVIEW_ACCESS_TOKEN,
    CTF_MANAGEMENT_ACCESS_TOKEN: process.env.CTF_MANAGEMENT_ACCESS_TOKEN
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
