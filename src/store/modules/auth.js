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
    signup ({ commit, dispatch }, authData) {
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

          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)

          dispatch('setLogoutTimer', res.data.expiresIn)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          router.push('/')
        })
        .catch(error => console.log(error))
    },

    login ({ commit, dispatch }, authData) {
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
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)

          dispatch('setLogoutTimer', res.data.expiresIn)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          router.push('/')
        })
        .catch(error => console.log(error.response.data))
    },

    tryAutoLogin ({ commit }) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()

      if (!token) {
        return
      }

      if (now >= expirationDate) {
        return
      }

      commit('authUser', {
        token: token,
        userId: userId
      })
    },

    logout ({ commit }) {
      commit('unAuth')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')

      router.push('/login')
    },

    setLogoutTimer ({ commit }, expTime) {
      setTimeout(() => {
        commit('unAuth')
      }, expTime * 1000)
    }
  },

  getters: {
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
}
