export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '场景管理',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-cssbackgroundImage
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css',
    '~assets/css/common.css',
    '~assets/font-awesome-4.7.0/css/font-awesome.min.css',
  ],
  loading: false,
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: "@plugins/element-ui", ssr: true},
    {src: '@/plugins/alloyFinger', ssr: false},
    '@/plugins/i18n',
    '@/plugins/axios',
    {src: '@/plugins/vueTouch', ssr: false},
    {src: '@/plugins/vueColors', ssr: false},
    '@/plugins/moment',
    '@/plugins/qs',
    '@/plugins/toast',
    {src: '@/plugins/vueRule', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    proxy: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],

  },
  router: {
    middleware: ['i18n']
  },
  telemetry: false
}
