import Vue from 'vue'
import Vuex from 'vuex'

import hall from './modules/hall'
import estimate from './modules/estimate'
import gonglue from './modules/gonglue'
import star from './modules/star'
import mystate from './modules/mystate'
import dish from './modules/dish'
import school from './modules/school'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hall,
    estimate,
    gonglue,
    star,
    dish,
    mystate,
    school
  }
})
