import request from 'superagent'
import axios from 'axios'
import qs from 'qs'
const baseurl = 'http://192.168.43.224:3001'

const state = {
  count: 0,
  us_id: localStorage.getItem('us_id'),
  us_name: '',
  userData: [],
  userItem: {}
}

const mutations = {
  getUserInfo (state, payload) {// 用户信息
    state.userData = payload.res
    state.us_name = payload.res[0].us_name
  },
  getUserInfoItem (state, payload) {// 全部用户信息
    state.userItem = payload.res
  }
}

const actions = {
  getUserInfo ({commit, state}) {
    let obj = {
      usid: localStorage.getItem('us_id')
    }
    axios.post(`http://192.168.43.224:3001/user/info`, qs.stringify(obj))
    .then(res => {
      commit({
        type: 'getUserInfo',
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
  getUserInfoItem ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      request
        .get(`http://192.168.43.224:3001/user/allinfo`)
        .end((err, res) => {
          // var myid = payload
          // console.log('接收到的list传给detail的index' + payload.id)
          // console.log('12123123' + res.body.data)
          if (!err) {
            let id = payload.id
            // console.log(res.body.data[id])
            commit({
              type: 'getUserInfoItem',
              res: res.body.data[id]
            })
            resolve(res)
          }
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

