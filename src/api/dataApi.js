import axios from 'axios'
import { getCookie } from '../helpers'
import store from '@/store'

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
  if (error.response.status === 401) {
    alert('You are not logged in, please log in!')
    store.dispatch('logout')
  }

  return Promise.reject(error)
})
