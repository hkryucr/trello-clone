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
    /*
    data: {
      name,
      description
      user: objectid
      column: objectid,
    },
    update the task array in column
    */
    const { name, description, userId, columnId } = data;
    const user = await User.findById({userId});
    const column = await Column.findById({columnId});
    if (!user) {
      socket.emit("error", "user not found!");
      return 
    }
    const task = new Task({
      name, 
      description, 
      creator: userId,
      column: columnId
    })

    task.save().then( task => {
      column.tasks.push(task._id);
      column.save().then( column => {
        io.socket.emit("newTask", task);
      }).catch( err => {
        socket.emit("error", err);
      })
    })
    return
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