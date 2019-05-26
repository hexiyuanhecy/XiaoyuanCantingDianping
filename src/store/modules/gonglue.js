import request from 'superagent'
import axios from 'axios'
import qs from 'qs'
const baseurl = 'http://192.168.43.224:3001'

const state = {
  count: 0,
  us_id: localStorage.getItem('us_id'),
  us_name: '',
  gonglueData: [],
  gonglueItem:{},
  user_gl:undefined
}

const mutations = {
  getGonglue (state, payload) {// 获取全部攻略
    state.gonglueData = payload.res
  },
  getGonglueItem (state, payload) {// 单个攻略
    state.gonglueItem = payload.res
  },
  getUserGonglue (state, payload) {// 用户发表的攻略
    state.user_gl = payload.res
  }
}

const actions = {
  getGonglue ({commit, state}) {
    axios.get(`http://192.168.43.224:3001/gonglue/gonglue`)
    .then(res => {
      console.log('res.data.data-----------')
      console.log(res.data.data)
      commit({
        type: 'getGonglue',
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
  getGonglueItem ({commit, state}, payload) {
    let id = {
      id: payload.id
    }
    console.log(id)
    return new Promise((resolve, reject) => {
      axios .post(`${baseurl}/gonglue/gonglue_item`,qs.stringify(id))
      .then(res => {
        console.log(res.data)
        commit({
          type: 'getGonglueItem',
          res: res.data.data[0]
        })
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  },
  getUserGonglue ({commit, state}, payload) {
    let id = {
      id:localStorage.getItem('us_id')
    }
    return new Promise((resolve, reject) => {
      axios .post(`${baseurl}/gonglue/user_gonglue`,qs.stringify(id))
      .then(res => {
        console.log(res.data)
        commit({
          type: 'getUserGonglue',
          res: res.data.data
        })
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

