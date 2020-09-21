import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
// import { createColumn } from "./socket"
// import socket from './socket'
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
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    CREATE_COLUMN (state, { name }) {
      // createColumn({ name: "a column", board: "5f66c2e45e333316b0443e80" });
      // socket.emit('createColumn', {
      //   name: 'a column',
      //   board: '5f66c2e45e333316b0443e80'
      // })
      state.board.columns.push({
        name,
        tasks: []
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