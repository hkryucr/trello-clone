const Column = require("../models/Column");
const User = require("../models/User");
const Task = require("../models/Task")

class TaskController {
  async moveTask(io, socket, data) {
    const { fromColumn, fromTask, toColumn, toTask, fromColumnId, toColumnId } = data;
    const fromColumnObj = await Column.findById(fromColumnId);
    const toColumnObj = await Column.findById(toColumnId);

    console.log(fromColumnObj, toColumnObj, "fromColumnObj, toColumnObj")

    const taskToMove = fromColumnObj.tasks.splice(fromTask, 1)[0]
    toColumnObj.tasks.splice(toTask, 0, taskToMove)

    fromColumnObj.save().then(col1 => {
      toColumnObj.save().then(col2 => {
        console.log(col1, col2, "col1, col2")
        io.sockets.emit("MOVE_TASK", { fromColumn, fromTask, toColumn, toTask });
      }).catch(err => {
          socket.emit("error", err);
      })
    })
  }

  async createTask(io, socket, data) {
    const { name, columnId } = data;
    const column = await Column.findById(columnId);

    const task = new Task({
      name, 
      column: columnId,
      board: column.board
    })
    // return
    task.save().then( task => {
      column.tasks.push(task._id);
      column.save()
        .then( column => {
          io.sockets.emit("CREATE_TASK", task);
        }).catch( err => {
          socket.emit("error", err);
        })
    })
  }

  async updateTask(io, socket, data) {
    // // UPDATE_TASK
    //   // edit Tasks
    // socket.on("updateTask", function (data) {
    //   /*
    //   -- receiving
    //   {
    //     _id:
    //     name:
    //     description:
    //     ...
    //   }

    //   -- responding POJO
    //   {
    //     _id:
    //     name:
    //     description:
    //     ...
    //   }
    //   */
    return;
  }
}

module.exports = TaskController