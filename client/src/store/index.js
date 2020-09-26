// import { createColumn } from "./socket"
import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '../default-board'
import { saveStatePlugin } from '../utils'
import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import VueInstance from '../main'
// import { signup } from '../utils/SessionApiUtil'
Vue.use(Vuex)

// should eliminate this lin
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

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
    }
  },
  mutations: {
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
    SOCKET_CREATE_TASK (state, newTask) {
      // - boardId = newTask
      if (state.board._id !== newTask.board) {
        return
      }
      const targetColumn = state.board.columns.filter(column => column._id === newTask.column)
      targetColumn[0].tasks.push(newTask)
    },
    SOCKET_CREATE_COLUMN (state, newColumn) {
      state.board.columns.push(newColumn)
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
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
