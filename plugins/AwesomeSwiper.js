// import Vue from 'vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)

import createApp from 'vue'
import SwiperClass, { /* swiper modules... */ } from 'swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import swiper module styles
import 'swiper/dist/css/swiper.css'
// more module style...

// use swiper modules
SwiperClass.use([/* swiper modules... */])

const app = createApp()
app.use(VueAwesomeSwiper)
