// import { axiosAuth, URL_KEY } from '@/api'
import router from '@/router'
import { getCookie } from '@/helpers'
import { authUser, URL_KEY } from '../../api/authApi'

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
    signup (context, authData) {
      authUser(context, authData, 'signUp', URL_KEY)
    },

    login (context, authData) {
      authUser(context, authData, 'signInWithPassword', URL_KEY)
    },

    logout ({ commit }) {
      commit('unAuth')
      router.push('/login')
    },

    setLogoutTimer ({ commit }, expTime) {
      setTimeout(() => {
        commit('unAuth')
        router.push('/login')
      }, +expTime * 1000)
    }
  },

  getters: {
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
}
