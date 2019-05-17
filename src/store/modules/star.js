import request from 'superagent'
import axios from 'axios'
import qs from 'qs'
// import jsonp from 'superagent-jsonp'
// const baseurl = 'http://10.202.44.234:3001'
const baseurl = 'http://192.168.43.224:3001'

const state = {
  count: 0,
  us_id: localStorage.getItem('us_id'),
  us_name: '',
  starDate: [],
  addStarRes: [],
  es_star:[],
  dh_star:[],
  gl_star:[]
}

const mutations = {
  getUserStar (state, payload) {
    state.starDate = payload.res
    state.starDate.map((value,index) => {
      if(value.type === 1){
        state.es_star.push(value)
      }
      else if(value.type ===2){
        state.dh_star.push(value)
      }
      else{
        state.gl_star.push(value)
      }
    })
  },
  addStar (state, payload) {
    state.addStarRes = payload.res
  },
  addstar (state, payload) {
    state.addStarRes = payload.res
  }
}

const actions = {
  getUserStar ({commit, state}) {
    let obj = {
      usid: localStorage.getItem('us_id')
    }
    axios.post(`http://192.168.43.224:3001/star/star`, qs.stringify(obj))
    .then(res => {
      // console.log('-----------------')
      // console.log(res.data.data)
      commit({
        type: 'getUserStar',
        res: res.data.data
      })
    })
    .catch(err => {
      console.log(err)
    })

  },
  
  /**
   * Getting single event
   * id: event id
   * payload.id 就是点击屏幕第几个后list传给detail的参数--index
   */
  addStar ({commit, state}, payload) {
    let obj = {
      us_id: localStorage.getItem('us_id'),
      st_id:payload.id,
      type:payload.kind
    }
    // console.log('未收藏')
    axios.post(`http://192.168.43.224:3001/star/add_star`, qs.stringify(obj))
    .then(res => {
    })
    .catch(err => {
    })
  },

  removeStar ({commit, state}, payload) {
    let obj = {
      us_id: localStorage.getItem('us_id'),
      st_id:payload.id,
      type:payload.kind
    }
    // console.log('未收藏')
    axios.post(`http://192.168.43.224:3001/star/remove_star`, qs.stringify(obj))
    .then(res => {
    })
    .catch(err => {
    })
  }

}
export default {
  state,
  mutations,
  actions
}

