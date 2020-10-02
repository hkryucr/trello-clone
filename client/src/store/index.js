// import { createColumn } from "./socket"
import Vue from 'vue'
import Vuex from 'vuex'
import { saveStatePlugin } from '../utils'
import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import VueInstance from '../main'
// import { signup } from '../utils/SessionApiUtil'
Vue.use(Vuex)

// should eliminate this lin
const board = JSON.parse(localStorage.getItem('board')) || []

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState(), saveStatePlugin],
  state: {
    board,
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
    login: ({ commit, dispatch }, { token, user }) => {
      commit('SET_TOKEN', token)
      commit('SET_USER', user)
      // set auth header
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    RESET: state => {
      Object.assign(state, { token: '', user: {} })
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

// fro mern / full

// backend -> entitity -> redux store -> display

// frontend -> change state -> send the information to the backend

// list

// 1)

// tasks = {
//   1: [
//     name:
//     description:
//   ],
//   2: [
//     name:
//     description:
//   ]
// }
// columns = {
//   name: "col 1",
//   tasks: [1,2]
// }
// "CREATE_TASK"
// -> "add a task into task db", "update column database"
// e.g)

// -> "should work"
// "CREATE_COLUMN" -> ""

// 2) backend/frontend validation
// 3)

// tasks = [1,2,3,4,5,6]
// tasks = [5,1,2,3,4,6]

// task 1 -> 5
