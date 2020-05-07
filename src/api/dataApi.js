import axios from 'axios'
import { getCookie } from '@/helpers'

export const axiosData = axios.create({
  baseURL: 'https://stock-trader-4d2c6.firebaseio.com'
})

axiosData.interceptors.request.use(config => {
  config.url = config.url + '?auth=' + getCookie('token')

  return config
})

axiosData.interceptors.response.use(response => {
  return response
}, function (error) {
  return Promise.reject(error)
})
