import Vue from 'vue'
import Vuex from 'vuex'

import hall from './modules/hall'
import estimate from './modules/estimate'
import gonglue from './modules/gonglue'
import star from './modules/star'
import search from './modules/search'
import mystate from './modules/mystate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hall,
    estimate,
    gonglue,
    star,
    search,
    mystate
  }
})
