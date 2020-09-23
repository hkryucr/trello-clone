import axios from 'axios'

export const createUser = (user) => {
  return axios.post('/api/users', user)
}

export const fetchUser = (userId) => {
  // fetch user should fetch all populated data
  return axios.get(`/api/users/${userId}`)
}

export const fetchUsers = () => {
  return axios.get(`/api/users`)
}
