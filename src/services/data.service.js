import { axiosData } from '@/core/api/dataApi'

class DataSevice {
  sendData (data, userId) {
    return axiosData.patch(`/users/${userId}.json`, data)
  }

  getData (userId) {
    return axiosData.get(`/users/${userId}.json`)
  }

  getStocks () {
    return axiosData.get('/stocks.json')
  }

  getFunds () {
    return axiosData.get('/funds.json')
  }
}

export const dataService = new DataSevice()
