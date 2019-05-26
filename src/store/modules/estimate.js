import request from 'superagent'
import axios from 'axios'
import qs from 'qs'
const baseurl = 'http://192.168.43.224:3001'

const state = {
  estimates:[],
  events: {
    0:[],
    1:[],
    2:[],
    3:[],
    4:[],
    5:[],
    6:[]
  },
  temp: [],
  skip: 0,
  eventItem: undefined,
  eventItemImg: undefined,
  dh_id: undefined,
  us_es: undefined,
  user_es: undefined
}
const mutations = {
  getSelectEs (state, payload) {// 单个评价
    state.estimates = payload.res
  },
  loadMore (state, payload) {//获取全部评价并分类
    // state.skip += 1
    // state.events[0] = state.events[0].concat(payload.res)
    // state.events[1] = state.events[1].concat(payload.hot)
    // state.events[2] = state.events[2].concat(payload.rihan)
    // state.events[3] = state.events[3].concat(payload.specialty)
    // state.events[4] = state.events[4].concat(payload.noodles)
    // state.events[5] = state.events[5].concat(payload.meat)
    // state.events[6] = state.events[6].concat(payload.daily)
    state.events[0] = payload.res
    state.events[1] = payload.hot
    state.events[2] = payload.rihan
    state.events[3] = payload.specialty
    state.events[4] = payload.noodles
    state.events[5] = payload.meat
    state.events[6] = payload.daily
  },
  getSingleEvent (state, payload) {// 单个评价
    state.eventItem = payload.res
    state.dh_id = payload.res.dh_id
    state.eventItemImg = payload.img
  },
  gerEstimateStar (state, payload) {// 用户收藏的评价
    state.us_es = payload.res
  },
  gerUserEstimate (state, payload) {// 用户发表的评价
    state.user_es = payload.res
  }
}

const actions = {
  getSelectEs ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${baseurl}/estimate/estimate_select`,qs.stringify(payload))
      .then(res => {
        console.log(res.data)
        commit({
          type: 'getSelectEs',
          res: res.data.data
        })
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  },
  loadMore ({commit, state}, payload) {
    let id = payload;
    axios .get(`${baseurl}/estimate/estimate`)
      .then(( res) => {
        // console.log(res.data.data)
        let data = res.data.data
        let hot = []
        let rihan = []
        let specialty = []
        let noodles = []
        let meat = []
        let daily = []
        let us_es = []
        data.map((value,index) => {
          if(value.hot === 1)  hot.push(value);
          if(value.rihan === 1)  rihan.push(value);
          if(value.specialty === 1)  specialty.push(value);
          if(value.noodles === 1)  noodles.push(value);
          if(value.meat === 1)  meat.push(value);
          if(value.daily === 1)  daily.push(value);
          if(value.us_id === id){
            us_es.push(value)
          }
        })
        commit({
          type: 'loadMore',
          res: res.data.data,
          hot: hot,
          rihan: rihan,
          specialty: specialty,
          noodles: noodles,
          meat: meat,
          daily: daily,
          us_es: us_es
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  getSingleEvent ({commit, state}, payload) {
    let id ={
      id:payload.id
    }
    return new Promise((resolve, reject) => {
      axios .post(`${baseurl}/estimate/estimate/item`,qs.stringify(id))
      .then(res => {
        console.log('获得单个评论信息')
        console.log(res.data)
        commit({
          type: 'getSingleEvent',
          res: res.data.data[0],
          img: res.data.img
        })
        resolve(res.data.data[0])
        localStorage.setItem('dh_id',res.data.data[0].dh_id)
      })
      .catch(err => {
        console.log(err)
      })
    })
  },
  gerEstimateStar ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      axios .get(`${baseurl}/estimate/estimate`)
      .then(res => {
        // console.log(res.data)
        commit({
          type: 'gerEstimateStar',
          res: res.data.data
        })
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  },
  gerUserEstimate ({commit, state}, payload) {
    let id = {
      id:localStorage.getItem('us_id')
    }
    console.log(id)
    return new Promise((resolve, reject) => {
      axios .post(`${baseurl}/estimate/user_estimate`,qs.stringify(id))
      .then(res => {
        console.log(res.data)
        commit({
          type: 'gerUserEstimate',
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
