
import router from '@/router'
import axios from 'axios'

export const URL_KEY = 'AIzaSyDLzMdBM3yeRBVTM3z6fbSh3p8TYOq-0jQ'

export const axiosAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1'
})

axiosAuth.interceptors.request.use(config => {
  return config
})

axiosAuth.interceptors.response.use(response => {
  return response
}, function (error) {
  if (error.response.status === 400 && error.response.data.error.message === 'EMAIL_EXISTS') {
    alert(error.response.data.error.message + ' please log in')
    router.push('/login')
    return Promise.reject(error)
  }

  if (error.response.status === 400 && error.response.data.error.message === 'EMAIL_NOT_FOUND') {
    alert(error.response.data.error.message + ' please register your email!')
    router.push('/signup')
    return Promise.reject(error)
  }

  if (error.response.status === 400 && error.response.data.error.message === 'WEAK_PASSWORD') {
    alert(error.response.data.error.message + ' please enter correct password!')
  }

  if (error.response.status === 400 && error.response.data.error.message === 'INVALID_PASSWORD') {
    alert(error.response.data.error.message + ' please enter correct password!')
  }

  console.log('status: ', error.response.status, 'message: ', error.response.data.error.message)

  return Promise.reject(error)
})

export function authUser (
  { commit, dispatch },
  authData,
  authType,
  URL_KEY
) {
  axiosAuth.post(`/accounts:${authType}?key=${URL_KEY}`, {
    email: authData.email,
    password: authData.password,
    returnSecureToken: true
  })
    .then(res => {
      const tokenId = res.data.idToken
      document.cookie = `token=${tokenId}; max-age=${res.data.expiresIn}`
      commit('authUser', {
        token: tokenId
      })

      dispatch('setLogoutTimer', res.data.expiresIn)
      router.push('/')
    })
    .catch(error => console.log(error))
}
