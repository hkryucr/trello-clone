import axios from 'axios'

export const fetchBackgrounds = () => {
  return axios.get(`/api/backgrounds`)
}
