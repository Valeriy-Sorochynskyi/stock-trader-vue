import stocksFromServer from '../../data.js'
import { axiosData } from '@/api/dataApi.js'

export default {
  state: {
    stocks: []
  },

  actions: {
    getStocks ({ commit }) {
      commit('SET_STOCKS', stocksFromServer)
    },

    buyStock ({ commit }, order) {
      commit('BUY_STOCK', order)
    },

    randomStocks ({ commit }) {
      commit('RND_STOCKS')
    },

    saveData ({ commit, getters, rootState }) {
      if (!rootState.auth.idToken) {
        return
      }

      const data = {
        funds: getters.funds,
        portfolioStocks: getters.portfolioStocks,
        stocks: getters.stocks
      }

      commit('SAVE_DATA', data)
    }
  },

  mutations: {
    'SET_STOCKS' (state, stocks) {
      state.stocks = stocks
    },

    'RND_STOCKS' (state) {
      state.stocks.forEach(stock => {
        stock.price = Math.round(stock.price * (1 + Math.random() - 0.5))
      })
    },

    'SAVE_DATA' (state, data) {
      axiosData.put('/data.json', data)
        .catch(err => console.log(err.response))
    }
  },

  getters: {
    stocks (state) {
      return state.stocks
    }
  }
}
