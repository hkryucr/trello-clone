import axios from 'axios'

export const fetchBoards = () => {
  return axios.get(`/api/boards`)
}

export const fetchBoard = (boardId) => {
  return axios.get(`/api/boards/${boardId}`)
}

export const searchBoardsAndTasks = (searchObj) => {
  return axios.get(`/api/boards/search`, {
    params: {
      searchObj
    }
  })
}
