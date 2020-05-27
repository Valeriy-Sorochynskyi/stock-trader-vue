import { dataService } from '@/services/data.service'

export const loadData = ({ commit, state, dispatch }) => {
  if (!state.auth.idToken) {
    return
  }

  const userId = state.auth.user.id

  return dataService.getData(userId)
    .then(({ data }) => {
      if (data && data.status) {
        commit('setStatus', data.status)
      }

      if (data && data.stocks) {
        const stocks = data.stocks
        const funds = data.funds
        const portfolioStocks = data.portfolioStocks
        const portfolio = {
          portfolioStocks,
          funds
        }

        commit('SET_STOCKS', stocks)
        commit('SET_PORTFOLIO', portfolio)
      } else {
        dispatch('getStocks')
        dispatch('getFunds')
      }
    })
}
