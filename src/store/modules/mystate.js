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
  userData: []
}

const mutations = {
  getUserInfo (state, payload) {
    state.userData = payload.res
    state.us_name = payload.res[0].us_name
  },
  getSingleEvent (state, payload) {
    state.eventItem = payload.res
  }
}

const actions = {
  getUserInfo ({commit, state}) {
    // request
    //   .get(`http://192.168.137.1:3001/user/info`)
    //   .end((err, res) => {
    //     // console.log(res.body.data)
    //     if (!err) {
    //       commit({
    //         type: 'getUserInfo',
    //         res: res.data.data
    //       })
    //     }
    // })
    
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
  getSingleEvent ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      request
        .get(`${baseurl}/estimate/estimate`)
        .end((err, res) => {
          // var myid = payload
          // console.log('接收到的list传给detail的index' + payload.id)
          // console.log('12123123' + res.body.data)
          if (!err) {
            let id = payload.id
            // console.log(id)
            commit({
              type: 'getSingleEvent',
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

