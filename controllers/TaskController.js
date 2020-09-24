const Task = ("../models/Task")

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
    // 
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