// import { createColumn } from "./socket"
import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '../default-board'
import { saveStatePlugin, uuid } from '../utils'
import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

// import { signup } from '../utils/SessionApiUtil'
Vue.use(Vuex)

// should eliminate this lin
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  plugin: [saveStatePlugin],
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
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
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
    CREATE_TASK (state, { tasks, name }) {
      // socket.emit('create task', {
      //   name,
      //   column: '5f67d92d4633980f6f9f6bf3'
      // })
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    CREATE_COLUMN (state, { name }) {
      // createColumn({ name: "a column", board: "5f66c2e45e333316b0443e80" });
      // socket.emit('create column', {
      //   name,
      //   board: '5f66c2e45e333316b0443e80'
      // })
      state.board.columns.push({ name, tasks: [] })
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN (state, {
      fromColumnIndex,
      toColumnIndex
    }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
    UPDATE_BOARD (state, { name }) {
      console.log('getting new board', name)
      state.board.name = name
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
