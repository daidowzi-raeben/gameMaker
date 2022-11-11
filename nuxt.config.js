// import path from 'path'
import colors from 'vuetify/es5/util/colors'
// import dotenv from 'dotenv'
// import {DIR_CONFIG} from './config/dirConfig'
// import { CONST_ENV_TYPE } from './config/envConfig'

require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - MAKER',
    title: 'MAKER',
    htmlAttrs: {
      lang: 'ko',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google-signin-client_id', content: '222131177892-51smeo64gg7v5lj0bjivi8uqhcni7pvt.apps.googleusercontent.com' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { src: 'https://apis.google.com/js/platform.js?onload=init' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/BootstrapVue.js', ssr: false, mode: 'client' },
    { src: '~plugins/MomentVue.js', ssr: false, mode: 'client' },
    { src: '~plugins/AwesomeSwiper.js', ssr: false, mode: 'client' },
    { src: '~plugins/Vcaledar.js', ssr: false, mode: 'client' },
    { src: '~plugins/HtmlEditor.js', ssr: false, mode: 'client' },
    { src: '~plugins/filters.js', ssr: false, mode: 'client' },
    { src: '~plugins/QrCode.js', ssr: false, mode: 'client' },
    { src: '~plugins/LottieWebVue.js', ssr: false, mode: 'client' },
    { src: '~plugins/ApexCart.js', ssr: false, mode: 'client' },
    { src: '~plugins/ColorPicker.js', ssr: false, mode: 'client' },
    { src: '~plugins/Vuedraggable.js', ssr: false, mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/device',
    'nuxt-socket-io',
    'vue2-editor/nuxt',
    'cookie-universal-nuxt',
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    html: {
      minify: {
        collapseWhitespace: true, // as @dario30186 mentioned
        removeComments: true, // 👈 add this line
      },
    },
  },
  server: { port: process.env.PORT, host: '0.0.0.0' },
  dir: {
    layouts: 'layouts'
  },
  ssr: true,
  // server: { port: process.env.PORT, host: '0.0.0.0' },
}
