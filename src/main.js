// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vueScrollBehavior from 'vue-scroll-behavior'
import VueMaterial from 'vue-material'
import Vuetify from 'vuetify'
import axios from 'axios'
import qs from 'qs'
import Js from '@/commentJs/jsjs.js'

// import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'css/boder.css'
import 'css/reset.css'
import 'normalize.css'
import 'swiper/dist/css/swiper.css'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'vuetify/dist/vuetify.min.css'

Vue.prototype.axios = axios
Vue.prototype.qs = qs
// Vue.prototype.baseurl = 'http://192.168.43.224:3001'

Vue.use(VueMaterial)
Vue.use(vueScrollBehavior, { router: router })
Vue.use(Vuetify)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
