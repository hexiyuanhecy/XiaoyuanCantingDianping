import axios from 'axios'
import qs from 'qs'
const baseurl = 'http://192.168.43.224:3001'

const state = {
  schoolData: []
}

const mutations = {
  getSchoolData (state, payload) {
    state.schoolData = payload.res
  }
}

const actions = {
  getSchoolData ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`http://192.168.43.224:3001/school/school`)
      .then(res => {
        commit({
          type: 'getSchoolData',
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

