import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
// import { createColumn } from "./socket"
import socket from './socket'
import { saveStatePlugin, uuid } from './utils'
Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugin: [saveStatePlugin],
  state: {
    board
  },
  getters: {
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
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      socket.emit('create task', {
        name,
        column: '5f67d92d4633980f6f9f6bf3'
      })
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    CREATE_COLUMN (state, { name }) {
      // createColumn({ name: "a column", board: "5f66c2e45e333316b0443e80" });
      socket.emit('create column', {
        name,
        board: '5f66c2e45e333316b0443e80'
      })
      socket.on('new column', (column) => {
        state.board.columns.push(column)
      })
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
    }
  }
})
