import { getCookie } from '@/core/cookies.service'
import { authService } from '@/services/auth.service'
import { statusService } from '@/services/status.service'

export default {
  state: {
    idToken: getCookie('token') || null,
    user: {
      id: null,
      status: null
    }
  },

  mutations: {
    authUser (state, token) {
      state.idToken = token
    },
    setUser (state, userId) {
      state.user.id = userId
    },
    unAuth (state) {
      state.idToken = null
      state.user.id = null
      state.user.status = null
      document.cookie = 'token=""; max-age=-1'
    },
    setStatus (state, status) {
      state.user.status = status
    }
  },

  actions: {
    signup ({ commit, dispatch }, authData) {
      return authService.getTokenBySignUp(authData)
        .then(res => {
          const tokenId = res.data.idToken
          const userId = res.data.localId

          document.cookie = `token=${tokenId}; max-age=${res.data.expiresIn}`

          commit('authUser', tokenId)
          commit('setUser', userId)

          dispatch('getStocks')
          dispatch('getFunds')
        })
    },
    login ({ commit, dispatch }, authData) {
      return authService.getTokenByLogin(authData)
        .then(res => {
          const tokenId = res.data.idToken
          const userId = res.data.localId

          document.cookie = `token=${tokenId}; max-age=${res.data.expiresIn}`

          commit('authUser', tokenId)
          commit('setUser', userId)

          return dispatch('loadData')
        }).catch(err => {
          return Promise.reject(err)
        })
    },
    logout ({ commit }) {
      commit('unAuth')
      commit('SET_PORTFOLIO', {
        funds: 0,
        portfolioStocks: []
      })
    },
    getUser ({ commit }, idToken) {
      return authService.getUser(idToken)
        .then(res => {
          const userId = res.data.users[0].localId

          commit('setUser', userId)
        })
    },
    subscribe ({ commit, state }, userStatus) {
      const userId = state.user.id

      return statusService.setStatus(userStatus, userId)
        .then(res => {
          const userStatus = res.data.status

          commit('setStatus', userStatus)
        })
    },
    fetchSession ({ dispatch, state }) {
      if (state.idToken) {
        return dispatch('getUser', state.idToken)
          .then(() => {
            return dispatch('loadData')
          })
      }
    }
  }
}
