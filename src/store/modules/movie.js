import request from 'superagent'
// import jsonp from 'superagent-jsonp'

const state = {
  hotMovies: []
}

const mutations = {
  getDiningHall (state, payload) {
    switch (payload.tag) {
      case 'hotMovies':
        state.hotMovies = payload.res
        break
    }
  }
}

const actions = {
  getDiningHall ({ commit }) {
    console.log('aaaaaaaaaaaaaaaaaaaa')
    request
      .get('http://localhost:3001/dining_hall')
      .end((err, res) => {
        console.log(res.body.data[0])
        if (!err) {
          commit({
            type: 'getDiningHall',
            tag: 'hotMovies',
            res: res.body.data
          })
        }
      })
  }
}

export default {
  state,
  mutations,
  actions
}
