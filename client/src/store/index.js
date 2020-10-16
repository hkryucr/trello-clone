import Vue from 'vue'
import Vuex from 'vuex'
import { saveStatePlugin } from '../utils'
import createPersistedState from 'vuex-persistedstate'
import VueInstance from '../main'
import AuthUtil, { setAuthToken } from '../utils/AuthUtil.js'
import { fetchUser } from '../utils/UserApiUtil'
import router from '../router'
import { initialState } from '../utils/InitialState'
const AUTH_TOKEN_KEY = 'authToken'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState(), saveStatePlugin],
  state: initialState(),
  getters: {
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
    getNavModal: state => {
      return state.ui && state.ui.navModal
    },
    getTask (state) {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task._id === id) return task
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
    }
  },
  actions: {
    login: ({ commit }, credentials) => AuthUtil.login(credentials),
    signup: ({ commit }, credentials) => AuthUtil.signup(credentials),
    logout: ({ commit }) => {
      commit('RESET', '')
    },
    fetchUser: ({ commit }, userId) => fetchUser(userId),
    createTask: ({ state, commit }, { name, columnId }) => {
      VueInstance.$socket.emit('createTask', { name, columnId })
    },
    createColumn: ({ state, commit }, newColumn) => {
      VueInstance.$socket.emit('createColumn', newColumn)
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
    updateBoard: ({ state, commit }, { name }) => {
      const boardId = state.board._id
      commit('UPDATE_BOARD_NAME', name)
      VueInstance.$socket.emit('updateBoard', {
        name,
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
    }
  },
  mutations: {
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
          console.log(err)
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
      this.state.board = board
    },
    SOCKET_UPDATE_BOARD (state, { name }) {
      this.state.board.name = name
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
      console.log(state.user.starredBoards)
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
    },
    OPEN_MODAL (state, modal) {
      state.ui.navModal = modal
    },
    CLOSE_MODAL (state) {
      state.ui.navModal = 'empty'
    }
  }
})
