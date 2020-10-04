// import { createColumn } from "./socket"
import Vue from 'vue'
import Vuex from 'vuex'
import { saveStatePlugin } from '../utils'
// import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import VueInstance from '../main'
import AuthUtil, { setAuthToken } from '../utils/AuthUtil.js'
import router from '../router'
const AUTH_TOKEN_KEY = 'authToken'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState(), saveStatePlugin],
  state: {
    board: {},
    token: '',
    user: {}
  },
  getters: {
    isLoggedIn: state => {
      return state.token
    },
    getUser: state => {
      return state.user
    },
    getTask (state) {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) return task
          }
        }
      }
    }
  },
  actions: {
    login: ({ commit }, credentials) => AuthUtil.login(credentials),
    signup: async ({ commit }, credentials) => {
      return AuthUtil.signup(credentials)
        .then(res => {
          commit('SET_TOKEN', res.data.token)
          commit('SET_USER', res.data.user)
          return res
        })
        .catch(err => err.response)
    },
    logout: ({ commit }) => {
      commit('RESET', '')
    },
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
      // commit("UPDATE_COLUMN_NAME", name);
      VueInstance.$socket.emit('updateColumn', {
        name,
        columnId
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
      state.user = user
      router.push({ name: 'boards' }).catch(err => {
        if (err.name !== 'NavigationDuplicated' && !err.message.includes('Avoided redundant navigation to current location')) {
          console.log(err)
        }
      })
    },
    RESET: state => {
      Object.assign(state, { token: '', user: {} })
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

    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
    }
  }
})
