import stocksFromServer from '@/data.js'
import { axiosData } from '@/core/api/dataApi.js'

export default {
  state: {
    stocks: []
  },

  mutations: {
    'SET_STOCKS' (state, stocks) {
      state.stocks = stocks
    },

    'RND_STOCKS' (state) {
      state.stocks.forEach(stock => {
        stock.price = Math.round(stock.price * (1 + Math.random() - 0.5))
      })
    }
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

    saveData ({ state, rootState }) {
      if (!rootState.auth.idToken) {
        return
      }

      const data = {
        funds: rootState.portfolio.funds,
        portfolioStocks: rootState.portfolio.portfolioStocks,
        stocks: state.stocks
      }

      return axiosData.put('/data.json', data)
    }
  }
}
