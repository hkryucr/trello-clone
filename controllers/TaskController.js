const Column = require("../models/Column");
const User = require("../models/User");
const Task = require("../models/Task")

class TaskController {
  async moveTask(io, socket, data) {
    // // MOVE_TASK
    //   // edit Columns - reorder tasks array
    // socket.on("moveTask", function (data) {
    //   /*
    //   -- receiving
    //   {
    //     task_id: (task id)
    //     column_id:
    //     fromTasks,
    //     toTasks,
    //     fromTaskIndex,
    //     toTaskIndex,
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

    // });
    return;
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
          io.sockets.in(task.board).emit("CREATE_TASK", task);
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