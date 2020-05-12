import axios from 'axios'

export const axiosAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1'
})

axiosAuth.interceptors.request.use(config => {
  return config
})

axiosAuth.interceptors.response.use(response => {
  return response
}, function (error) {
  return Promise.reject(error)
})
