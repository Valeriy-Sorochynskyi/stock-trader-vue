export default {
  state: {
    funds: 10000,
    stocks: []
  },

  getters: {
    portfolioStocks (state, getters, rootState) {
      return state.stocks.map(stock => {
        const record = rootState.stocks.stocks.find(
          element => element.id === stock.id
        )

        return {
          id: stock.id,
          amount: stock.amount,
          price: record.price,
          name: record.name
        }
      })
    }
  },

  mutations: {
    'BUY_STOCK' (state, order) {
      const stock = state.stocks.find(stock => stock.id === order.id)

      if (stock) {
        stock.amount += order.amount
      } else {
        state.stocks.push({
          id: order.id,
          amount: order.amount
        })
      }

      state.funds -= order.price * order.amount
    },

    'SELL_STOCK' (state, order) {
      const stock = state.stocks.find(stock => stock.id === order.id)

      if (stock.amount > order.amount) {
        stock.amount -= order.amount
      } else {
        state.stocks.splice(state.stocks.indexOf(stock), 1)
      }

      state.funds += order.price * order.amount
    },

    'SET_PORTFOLIO' (state, portfolio) {
      state.funds = portfolio.funds
      state.stocks = portfolio.portfolioStocks ? portfolio.portfolioStocks : []
    }
  },

  actions: {
    sellStock ({ commit }, order) {
      commit('SELL_STOCK', order)
    }
  }
}
