import axios from 'axios'
import { getCookie } from '@/core/cookies.service.js'
import { Notification } from 'element-ui'
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
  const message = error.response.statusText ? error.response.statusText : error

  if (error.response.status === 401) {
    store.dispatch('logout')

    Notification.error({
      title: 'Error',
      message
    })
  }

  return Promise.reject(error)
})
