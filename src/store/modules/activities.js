import request from 'superagent'
// import jsonp from 'superagent-jsonp'
// const baseurl = 'http://10.202.44.234:3001'
const baseurl = 'http://192.168.43.224:3001'

const state = {
  events: [],
  temp: [],
  skip: 0,
  eventItem: {}
}

const mutations = {
  loadMore (state, payload) {
    state.skip += 3
    state.events = state.events.concat(payload.res)
  },
  getSingleEvent (state, payload) {
    state.eventItem = payload.res
  }
}

const actions = {
  loadMore ({commit, state}) {
    request
      .get(`${baseurl}/estimate/estimate`)
      .end((err, res) => {
        console.log(1231231111)
        if (!err) {
          commit({
            type: 'loadMore',
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
