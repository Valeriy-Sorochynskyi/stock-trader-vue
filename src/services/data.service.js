import { axiosData } from '../core/api/dataApi'

class DataSevice {
  sendData (data) {
    return axiosData.put('/data.json', data)
  }

  getData () {
    return axiosData.get('/data.json')
  }
}

export const dataService = new DataSevice()
