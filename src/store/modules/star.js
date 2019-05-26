import axios from 'axios'
import qs from 'qs'
const baseurl = 'http://192.168.43.224:3001'

const state = {
  count: 0,
  us_id: localStorage.getItem('us_id'),
  us_name: '',
  starDate: [],
  addStarRes: [],
  es_star:[],
  ds_star:[],
  dh_star:[],
  gl_star:[]
}

const mutations = {
  getUserStar (state, payload) {// 用户收藏表并分类
    state.starDate = payload.res
        state.es_star = payload.es_star
        state.dh_star = payload.dh_star
        state.gl_star = payload.gl_star
        state.ds_star = payload.ds_star
  },
  addStar (state, payload) {// 加入收藏
    state.addStarRes = payload.res
  },
  removeStar (state, payload) {// 取消收藏
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
      let es_star = []
      let dh_star = []
      let gl_star = []
      let ds_star = []
      res.data.data.map((value,index) => {
        if(value.type === 1){
          es_star.push(value)
        }
        else if(value.type ===2){
          dh_star.push(value)
        }
        else if(value.type ===3){
          gl_star.push(value)
        }
        else {
          ds_star.push(value)
        }
      })
      commit({
        type: 'getUserStar',
        res: res.data.data,
        es_star: es_star,
        dh_star: dh_star,
        gl_star: gl_star,
        ds_star: ds_star
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

