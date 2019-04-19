import request from 'superagent'

// const baseurl = 'http://10.202.44.234:3001'
const baseurl = 'http://192.168.43.224:3001'
const state = {
  guihuayuan: [],
  noodles: [],
  breakfast: [],
  meat: [],
  hall_info: {}
}

const mutations = {
  getDiningHall (state, payload) {
    switch (payload.tag) {
      case 'guihuayuan':
        state.guihuayuan = payload.res
        break
      case 'noodles':
        state.noodles = payload.res
        break
      case 'breakfast':
        state.breakfast = payload.res
        break
      case 'meat':
        state.meat = payload.res
        break
      default:
        state.all = payload.res
    }
  },
  getSingleHall (state, payload) {
    state.hall_info = payload.res
  }
}

const actions = {
  getDiningHall ({ commit }) {
    request
      .get('http://192.168.43.224:3001/dining_hall/dining_hall')
      .end((err, res) => {
        if (!err) {
          let guihuayuan = []
          res.body.data.map(function (value, index) {
            if (value.dining === '桂花园') guihuayuan.push(value)
          })
          commit({
            type: 'getDiningHall',
            tag: 'guihuayuan',
            res: guihuayuan
          })
        }
      })
    request
      .get('http://192.168.43.224:3001/dining_hall/dining_hall')
      .end((err, res) => {
        if (!err) {
          let noodles = []
          res.body.data.map(function (value, index) {
            if (value.noodles === 1) noodles.push(value)
          })
        //   console.log('123' + noodles)
          commit({
            type: 'getDiningHall',
            tag: 'noodles',
            res: noodles
          })
        }
      })
    request
      .get('http://192.168.43.224:3001/dining_hall/dining_hall')
      .end((err, res) => {
        if (!err) {
          let breakfast = []
          res.body.data.map(function (value, index) {
            if (value.breakfast === 1) breakfast.push(value)
          })
          commit({
            type: 'getDiningHall',
            tag: 'breakfast',
            res: breakfast
          })
        }
      })
    request
      .get('http://192.168.43.224:3001/dining_hall/dining_hall')
      .end((err, res) => {
        if (!err) {
          let meat = []
          res.body.data.map(function (value, index) {
            if (value.meat === 1) meat.push(value)
          })
          commit({
            type: 'getDiningHall',
            tag: 'meat',
            res: meat
          })
        }
      })
    request
      .get('http://192.168.43.224:3001/dining_hall/dining_hall')
      .end((err, res) => {
        if (!err) {
          commit({
            type: 'getDiningHall',
            tag: 'all',
            res: res.body.data
          })
        }
      })
  },
  /**
   * Getting single event
   * id: event id
   * payload.id 就是点击屏幕第几个后list传给detail的参数--index
   */
  getSingleHall ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      request
        .get(`${baseurl}/dining_hall/dining_hall`)
        .end((err, res) => {
          // var myid = payload
          console.log('接收到的餐厅列表穿的id的index===>' + (+payload.id - 1))
          console.log(res.body.data[payload.id])
          if (!err) {
            let id = (+payload.id) - 1
            // console.log(id)
            commit({
              type: 'getSingleHall',
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
