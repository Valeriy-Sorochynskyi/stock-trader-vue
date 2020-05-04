import axios from 'axios'

export const loadData = ({ commit, state }) => {
  if (!state.auth.idToken) {
    return
  }
  axios.get('/data.json')
    .then(response => response.data)
    .then(data => {
      if (data) {
        const stocks = data.stocks
        const funds = data.funds
        const portfolioStocks = data.portfolioStocks
        const portfolio = {
          portfolioStocks,
          funds
        }

        commit('SET_STOCKS', stocks)
        commit('SET_PORTFOLIO', portfolio)
      }
    }).catch(error => console.log(error.response))
}