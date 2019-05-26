import request from 'superagent'
import axios from 'axios'
import qs from 'qs'
// const baseurl = 'http://10.202.44.234:3001'
const baseurl = 'http://192.168.43.224:3001'
const state = {
  obj: {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  },
  guihuayuan: [],
  meiguiyuan: [],
  ziweige: [],
  noodles: [],
  breakfast: [],
  meat: [],
  hall_info: {},
  hallItem: {},
  hallItemImg:{},
  hallItemDish:{},
  hallItemEs:{},
  hall_kind: []
}

const mutations = {
  getDiningHall (state, payload) {// 获取全部餐厅并分类
    state.obj[1] = payload.kind1
    state.obj[2] = payload.kind2
    state.obj[3] = payload.kind3
    state.obj[4] = payload.kind4
    state.obj[5] = payload.kind5
    state.obj[6] = payload.kind6
    state.obj[0] = payload.res
  },
  getSingleHall (state, payload) {// 单个餐厅
    state.hallItem = payload.res
    state.hallItemImg = payload.img
    state.hallItemEs = payload.estimate
    state.hallItemDish = payload.dish
  },
  getSingleHallEs (state, payload) {//单个餐厅评价
    state.hallItemEs = payload.res
  },
  getHall_kind (state, payload) {//分类餐厅
    state.hall_kind = payload.res
  }
}

const actions = {
  getDiningHall ({ commit }) {
    return new Promise((resolve, reject) => {
    request
      .get('http://192.168.43.224:3001/dining_hall/dining_hall')
      .end((err, res) => {
        // console.log('在函数里')
        if (!err) {
          let guihuayuan = []
          let meiguiyuan = []
          let ziweige = []
          let noodles = []
          let breakfast = []
          let meat = []
          res.body.data.map(function (value, index) {
            if (value.dining === '桂花园') guihuayuan.push(value)
            if (value.dining === '玫瑰园') meiguiyuan.push(value)
            if (value.dining === '紫薇阁') ziweige.push(value)
            if (value.noodles === 1) noodles.push(value)
            if (value.breakfast === 1) breakfast.push(value)
            if (value.meat === 1) meat.push(value)
          })
          commit({
            type: 'getDiningHall',
            res: res.body.data,
            kind1: guihuayuan,
            kind2: meiguiyuan,
            kind3: ziweige,
            kind4: noodles,
            kind5: breakfast,
            kind6: meat,
          })
          resolve(res.body.data)
        }
      })
    })
  },
  /**
   * Getting single event
   * id: event id
   * payload.id 就是点击屏幕第几个后list传给detail的参数--index
   */
  getSingleHall ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      let obj = {
        id: payload.id
      }
      axios.post(`http://192.168.43.224:3001/dining_hall/dining_hall/item`, qs.stringify(obj))
      .then(res => {
        // console.log('获得单个餐厅的信息'+obj.id)
        // console.log(res.data)
        commit({
          type: 'getSingleHall',
          res: res.data.data[0],
          img: res.data.img,
          dish: res.data.dish
        })
        resolve(res.data.data[0])
      })
      .catch(err => {
        console.log(err)
      })
    })
  },

  getSingleHallEs ({commit, state}, payload) {
    let obj = {
      id: payload.id
    }
    return new Promise((resolve, reject) => {
      axios.post(`http://192.168.43.224:3001/dining_hall/dining_hall/item_es`, qs.stringify(obj))
      .then(res => {
        commit({
          type: 'getSingleHallEs',
          res: res.data.data
        })
        resolve(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  },
  
  getHall_kind ({commit, state}, payload) {
    let obj = {
      dining: payload.dining,
      select: payload.select
    }
    return new Promise((resolve, reject) => {
      axios.post(`http://192.168.43.224:3001/dining_hall/dining_hall_kind`, qs.stringify(obj))
      .then(res => {
        commit({
          type: 'getHall_kind',
          res: res.data.data
        })
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
