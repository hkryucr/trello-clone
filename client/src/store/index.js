import Vue from 'vue'
import Vuex from 'vuex'
import { saveStatePlugin } from '../utils'
import createPersistedState from 'vuex-persistedstate'
import VueInstance from '../main'
import AuthUtil, { setAuthToken } from '../utils/AuthUtil.js'
import { searchBoardsAndTasks } from '../utils/BoardApiUtil.js'
import { fetchBackgrounds } from '../utils/BackgroundUtil'
import { fetchUser } from '../utils/UserApiUtil'
import router from '../router'
import { initialState } from '../utils/InitialState'
import _ from 'lodash'

const AUTH_TOKEN_KEY = 'authToken'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState(), saveStatePlugin],
  state: initialState(),
  getters: {
    getSearchResultBoards: state => {
      return state.searchResult.boards
    },
    getSearchResultTasks: state => {
      return state.searchResult.tasks
    },
    getSearchResultLoaded: state => {
      return state.searchResult.loaded
    },
    isCurrentUser: state => {
      return state.session.isLoggedIn
    },
    getUser: state => {
      return state.user
    },
    getCurrentUser: state => {
      return state.session.currentUser
    },
    getBoards: state => {
      return state.user && state.user.boards
    },
    getRecentlyViewed: state => {
      if (_.isEmpty(state.user) || _.isEmpty(state.user.boards)) return []
      const sortedRecentlyViewed = Object.assign([], state.user.boards)
      sortedRecentlyViewed.sort((a, b) => Date.parse(b.viewedAt) - Date.parse(a.viewedAt))
      return sortedRecentlyViewed.filter(el => !state.user.starredBoards[el._id] && Date.parse(el.viewedAt) > (Date.now() - 604800000)).slice(0, 6)
    },
    getStarredBoards: state => {
      if (_.isEmpty(state.user) || _.isEmpty(state.user.boards) || _.isEmpty(state.user.starredBoards)) return []
      return state.user.boards.filter(board => state.user.starredBoards[board._id])
    },
    getStarredBoardsObj: state => {
      if (_.isEmpty(state.user) || _.isEmpty(state.user.starredBoards)) return {}
      return state.user.starredBoards
    },
    getNavModal: state => {
      return state.ui && state.ui.navModal
    },
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (let i = 0; i < column.tasks.length; i++) {
            if (column.tasks[i]._id === id) {
              const task = column.tasks[i]
              task.idx = i
              return task
            }
          }
        }
      }
    },
    getColumn (state) {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task._id === id) return column
          }
        }
      }
    },
    getBackgrounds (state) {
      return state.backgrounds
    }
  },
  actions: {
    login: ({ commit }, credentials) => AuthUtil.login(credentials),
    signup: ({ commit }, credentials) => AuthUtil.signup(credentials),
    searchBoardsAndTasks: ({ commit }, searchObj) => searchBoardsAndTasks(searchObj),
    logout: ({ commit }) => {
      commit('RESET', '')
    },
    fetchUser: ({ commit }, userId) => fetchUser(userId),
    createTask: ({ state, commit }, { name, columnId, userId }) => {
      VueInstance.$socket.emit('createTask', { name, columnId, userId })
    },
    createColumn: ({ state, commit }, newColumn) => {
      VueInstance.$socket.emit('createColumn', newColumn)
    },
    createBoard: ({ state, commit }, board) => {
      VueInstance.$socket.emit('createBoard', board)
    },
    moveTask: (
      { state, commit },
      { fromColumn, fromTask, toColumn, toTask }
    ) => {
      const fromColumnId = state.board.columns[fromColumn]._id
      const toColumnId = state.board.columns[toColumn]._id
      VueInstance.$socket.emit('moveTask', {
        fromColumn,
        fromTask,
        toColumn,
        toTask,
        fromColumnId,
        toColumnId
      })
    },
    moveColumn: ({ state, commit }, { fromColumnIndex, toColumnIndex }) => {
      const boardId = state.board._id
      VueInstance.$socket.emit('moveColumn', {
        fromColumnIndex,
        toColumnIndex,
        boardId
      })
    },
    updateBackground: ({ state, commit }, data) => {
      VueInstance.$socket.emit('updateBackground', data)
    },
    updateBoard: ({ state, commit }, { name }) => {
      const boardId = state.board._id
      commit('UPDATE_BOARD_NAME', name)
      VueInstance.$socket.emit('updateBoard', {
        name,
        boardId
      })
    },
    updateBoardViewDate: ({ state, commit }) => {
      const boardId = state.board._id
      VueInstance.$socket.emit('updateBoardViewDate', {
        boardId
      })
    },
    updateColumn: ({ state, commit }, { name, columnId }) => {
      VueInstance.$socket.emit('updateColumn', {
        name,
        columnId
      })
    },
    updateTask: ({ state, commit }, { body, taskId, type }) => {
      VueInstance.$socket.emit('updateTask', {
        body,
        taskId,
        type
      })
    },
    starBoard: ({ state, commit }, { userId, boardId, bool }) => {
      VueInstance.$socket.emit('starBoard', {
        userId,
        boardId,
        bool
      })
    },
    deleteTask: ({ state, commit }, { task, idx }) => {
      VueInstance.$socket.emit('deleteTask', {
        task,
        idx
      })
    },
    deleteColumn: ({ state, commit }, { column, idx }) => {
      VueInstance.$socket.emit('deleteColumn', {
        column,
        idx
      })
    },
    deleteBoard: ({ state, commit }, boardId) => {
      VueInstance.$socket.emit('deleteBoard', {
        boardId
      })
    },
    fetchBackgrounds: () => fetchBackgrounds()
  },
  mutations: {
    RESET_SEARCH_RESULT: (state) => {
      state.searchResult = {
        loaded: false,
        boards: [],
        tasks: []
      }
    },
    UPDATE_SEARCH_RESULT: (state, data) => {
      state.searchResult = data
      state.searchResult.loaded = true
    },
    UPDATE_BOARD_NAME: (state, { name }) => {
      state.board.name = name
    },
    SET_TOKEN: (state, token) => {
      setAuthToken(token)
    },
    SET_USER: (state, user) => {
      state.session.currentUser = user
      state.session.isLoggedIn = true
      router.push({ name: 'boards' }).catch(err => {
        if (err.name !== 'NavigationDuplicated' && !err.message.includes('Avoided redundant navigation to current location')) {
          console.error(err)
        }
      })
    },
    UPDATE_USER: (state, user) => {
      state.user = user
    },
    RESET: state => {
      Object.assign(state, initialState())
      localStorage.setItem(AUTH_TOKEN_KEY, '')
    },
    UPDATE_BOARD_STATE (state, { board }) {
      state.board = board
    },
    SET_BACKGROUNDS: (state, backgrounds) => {
      state.backgrounds = backgrounds
    },
    SOCKET_UPDATE_BOARD (state, { name, viewedAt }) {
      state.board.name = name
      state.board.viewedAt = viewedAt
    },
    SOCKET_UPDATE_BACKGROUND (state, background) {
      state.board.background = background
    },
    SOCKET_UPDATE_COLUMN (state, newColumn) {
      const targetColumn = state.board.columns.find(
        column => column._id === newColumn._id
      )
      targetColumn.name = newColumn.name
    },
    SOCKET_UPDATE_TASK (state, newTask) {
      for (const column of state.board.columns) {
        for (let task of column.tasks) {
          if (task._id === newTask._id) {
            task.name = newTask.name
            task.description = newTask.description
            return
          }
        }
      }
    },
    SOCKET_CREATE_TASK (state, newTask) {
      const targetColumn = state.board.columns.find(
        column => column._id === newTask.column
      )
      targetColumn.tasks.push(newTask)
    },
    SOCKET_CREATE_COLUMN (state, newColumn) {
      state.board.columns.push(newColumn)
    },
    SOCKET_CREATED_BOARD (state, newBoard) {
      state.board = newBoard
      state.user.boards = [...state.user.boards, newBoard]
      state.user.starredBoards = Object.assign({}, state.user.starredBoards)
      state.user.starredBoards[newBoard._id] = false
      router.push({
        name: 'board',
        params: { id: newBoard._id }
      })
    },
    SOCKET_MOVE_TASK (state, { fromColumn, fromTask, toColumn, toTask }) {
      const fromTasks = state.board.columns[fromColumn].tasks
      const toTasks = state.board.columns[toColumn].tasks
      const taskToMove = fromTasks.splice(fromTask, 1)[0]
      toTasks.splice(toTask, 0, taskToMove)
    },
    SOCKET_MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
    SOCKET_UPDATE_USER_STARRED_BOARDS (state, { boardId, bool }) {
      state.user.starredBoards[boardId] = bool
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
    },
    SOCKET_DELETED_TASK (state, { columnId, taskId, taskIdx }) {
      for (let i = 0; i < state.board.columns.length; i++) {
        if (state.board.columns[i]._id === columnId) {
          state.board.columns[i].tasks.splice(taskIdx, 1)
          return
        }
      }
    },
    SOCKET_DELETED_COLUMN (state, { columns, idx }) {
      state.board.columns.splice(idx, 1)
    },
    SOCKET_DELETED_BOARD (state, boardId) {
      if (!(_.isEmpty(state.user) || _.isEmpty(state.user.boards))) {
        state.user.boards = state.user.boards.filter((board) => boardId !== board._id)
      }
      delete state.user.starredBoards[boardId]
      router.push({ name: 'boards' })
    },
    OPEN_MODAL (state, modal) {
      state.ui.navModal = modal
    },
    CLOSE_MODAL (state) {
      state.ui.navModal = 'empty'
    }
  }
})
