import router from '@/router'
import { getCookie } from '@/helpers'
import { URL_KEY, axiosAuth } from '@/api/authApi'

export default {
  state: {
    idToken: getCookie('token') || null
  },

  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
    },

    unAuth (state) {
      state.idToken = null
      document.cookie = 'token=""; max-age=-1'
    }
  },

  actions: {
    signup ({ commit }, authData) {
      return axiosAuth.post(`/accounts:signUp?key=${URL_KEY}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          const tokenId = res.data.idToken
          document.cookie = `token=${tokenId}; max-age=${res.data.expiresIn}`
          commit('authUser', {
            token: tokenId
          })

          router.push('/')
        })
    },

    login ({ commit }, authData) {
      return axiosAuth.post(`/accounts:signInWithPassword?key=${URL_KEY}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          const tokenId = res.data.idToken

          document.cookie = `token=${tokenId}; max-age=${res.data.expiresIn}`

          commit('authUser', {
            token: tokenId
          })

          router.push('/')
        })
    },

    logout ({ commit }) {
      commit('unAuth')
      router.push('/login')
    }
  },

  getters: {
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
}
