import router from '@/router'
import { getCookie } from '@/core/cookies.service'
import { authService } from '@/services/auth.service'

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
      return authService.getTokenBySignUp(authData)
        .then(res => {
          const tokenId = res.data.idToken
          document.cookie = `token=${tokenId}; max-age=${res.data.expiresIn}`
          commit('authUser', {
            token: tokenId
          })
        })
    },

    login ({ commit }, authData) {
      return authService.getTokenByLogin(authData)
        .then(res => {
          const tokenId = res.data.idToken

          document.cookie = `token=${tokenId}; max-age=${res.data.expiresIn}`

          commit('authUser', {
            token: tokenId
          })
        })
    },

    logout ({ commit }) {
      commit('unAuth')
      router.push('/login')
    }
  }
}
