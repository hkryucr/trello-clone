import axios from 'axios'
const AUTH_TOKEN_KEY = 'authToken'

export default {
  login (credentials) {
    return axios
      .post('/api/users/login', credentials)
  },
  signup (credentials) {
    return axios
      .post('/api/users/signup', credentials)
  }
}

export function logoutUser () {
  axios.defaults.headers.common['Authorization'] = ''
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function setAuthToken (token) {
  axios.defaults.headers.common['Authorization'] = token
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken () {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}
