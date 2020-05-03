import stocksFromServer from '../../data.js'
import axios from 'axios'

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

    saveData ({ commit }, data) {
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
      axios.put('/data.json', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  },

  getters: {
    stocks (state) {
      return state.stocks
    }
  }
}
