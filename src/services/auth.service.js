import { axiosAuth } from '@/core/api/authApi'
import { URL_KEY } from '@/core/config'

class AuthService {
  getTokenBySignUp ({ email, password }) {
    return axiosAuth.post(`/accounts:signUp?key=${URL_KEY}`, {
      email,
      password,
      returnSecureToken: true
    })
  }

  getTokenByLogin ({ email, password }) {
    return axiosAuth.post(`/accounts:signInWithPassword?key=${URL_KEY}`, {
      email,
      password,
      returnSecureToken: true
    })
  }
}

export const authService = new AuthService()
