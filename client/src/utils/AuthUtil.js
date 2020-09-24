import axios from 'axios'
export default {
  login (credentials) {
    return axios
      .post('/api/users/login', credentials)
      .then(response => response)
      .catch(err => err)
  },
  signUp (credentials) {
    return axios
      .post('/api/users/signup', credentials)
  }
}
