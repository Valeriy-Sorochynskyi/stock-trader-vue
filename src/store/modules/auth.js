import axiosAuth from '../../axios-auth'
import router from '../../router'

export default {
  state: {
    idToken: null,
    userId: null
  },

  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },

    unAuth (state) {
      state.idToken = null
      state.userId = null
    }
  },
  actions: {
    signup ({ commit }, authData) {
      axiosAuth.post('/accounts:signUp?key=AIzaSyDLzMdBM3yeRBVTM3z6fbSh3p8TYOq-0jQ', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
        })
        .catch(error => console.log(error))
    },

    login ({ commit }, authData) {
      axiosAuth.post('/accounts:signInWithPassword?key=AIzaSyDLzMdBM3yeRBVTM3z6fbSh3p8TYOq-0jQ', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })

          router.push('/stocks')
        })
        .catch(error => console.log(error))
    },

    logout ({ commit }) {
      commit('unAuth')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
}
