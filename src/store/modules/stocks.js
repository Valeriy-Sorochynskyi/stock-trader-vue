import stocksFromServer from '../../data.js'

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
    }
  },

  getters: {
    stocks (state) {
      return state.stocks
    }
  }
}
