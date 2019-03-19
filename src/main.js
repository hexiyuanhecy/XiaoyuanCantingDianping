// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vueScrollBehavior from 'vue-scroll-behavior'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'normalize.css'
import 'swiper/dist/css/swiper.css'

Vue.use(vueScrollBehavior, { router: router })
// Vue.use(VueAwesomeSwiper, /* { default global options } */)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
