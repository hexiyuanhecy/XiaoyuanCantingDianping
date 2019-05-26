import axios from 'axios'
import qs from 'qs'
const baseurl = 'http://192.168.43.224:3001'

const state = {
  count: 0,
  dishAll: [],
  dishData: [],
  dishItem: {},
  dishItemEs: []
}

const mutations = {
  getDish (state, payload) {
    state.dishData = payload.res
  },
  getDishAll (state, payload) {
    state.dishAll = payload.res
  },
  getDishItem (state, payload) {
    state.dishItem = payload.res
  },
  getDishItemEs (state, payload) {
    state.dishItemEs = payload.res
  }
}

const actions = {
  getDish ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`http://192.168.43.224:3001/dish/dish`, qs.stringify(payload))
      .then(res => {
        commit({
          type: 'getDish',
          res: res.data.data
        })
        resolve(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  },

  getDishAll ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`http://192.168.43.224:3001/dish/dish_all`,)
      .then(res => {
        commit({
          type: 'getDishAll',
          res: res.data.data
        })
        resolve(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  },
  
  getDishItem ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      let obj = {
        id: payload.id
      }
      axios.post(`http://192.168.43.224:3001/dish/dish_item`, qs.stringify(obj))
      .then(res => {
        commit({
          type: 'getDishItem',
          res: res.data.data
        })
        resolve(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  },
  
  getDishItemEs ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      let obj = {
        id: payload.id,
        select:payload.select
      }
      console.log(obj)
      axios.post(`http://192.168.43.224:3001/dish/dish_item_es`, qs.stringify(obj))
      .then(res => {
        commit({
          type: 'getDishItemEs',
          res: res.data.data
        })
        // console.log(res.data.data)
        resolve(res.data.data)
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

