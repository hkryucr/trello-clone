const Column = require("../models/Column");
const User = require("../models/User");
const Task = require("../models/Task");

class TaskController {
  async moveTask(io, socket, data) {
    const {
      fromColumn,
      fromTask,
      toColumn,
      toTask,
      fromColumnId,
      toColumnId
    } = data;
    const fromColumnObj = await Column.findById(fromColumnId);
    if (fromColumnId === toColumnId) {
      const taskToMove = fromColumnObj.tasks.splice(fromTask, 1)[0];
      fromColumnObj.tasks.splice(toTask, 0, taskToMove);
      fromColumnObj
        .save()
        .then((col1) => {
          socket.broadcast.emit("MOVE_TASK", {
            fromColumn,
            fromTask,
            toColumn,
            toTask
          });
        })
        .catch((err) => {
          socket.emit("error", err);
        });
      // if its different columns
    } else {
      const toColumnObj = await Column.findById(toColumnId);
      const taskToMove = fromColumnObj.tasks.splice(fromTask, 1)[0];

      const curTask = await Task.findById(taskToMove)
      curTask.column = toColumnId
      curTask.save().then(()=>{
        toColumnObj.tasks.splice(toTask, 0, taskToMove);
        fromColumnObj.save().then((col1) => {
          toColumnObj
            .save()
            .then((col2) => {
              socket.broadcast.emit("MOVE_TASK", {
                fromColumn,
                fromTask,
                toColumn,
                toTask
              });
            })
            .catch((err) => {
              socket.emit("error", err);
            });
        });
      })
      .catch((err) => {
        socket.emit("error", err);
      });
    }
  }

  async createTask(io, socket, data) {
    const { name, columnId, userId } = data;
    const column = await Column.findById(columnId);

    const task = new Task({
      name,
      column: columnId,
      board: column.board,
      user: userId
    });
    // return
    task.save().then((task) => {
      column.tasks.push(task._id);
      column
        .save()
        .then((column) => {
          io.sockets.emit("CREATE_TASK", task);
        })
        .catch((err) => {
          socket.emit("error", err);
        });
    });
  }

  async updateTask(io, socket, data) {
    const { body, taskId, type } = data;
    const taskObj = await Task.findById(taskId);
    if (type === "name") {
      taskObj.name = body;
    } else if (type === "description") {
      taskObj.description = body;
    }
    taskObj.save().then((task) => {
      io.sockets.emit("UPDATE_TASK", taskObj);
    });
  }

  async deleteTask(io, socket, { task, idx }) {
    const taskObj = await Task.findOneAndDelete({_id: task._id})
    await Column.findOneAndUpdate({_id: taskObj.column}, {$pull: {tasks: task._id }}, {new: true}, function(err, col) {
        if (err) {
            res.send(err);
        }
        io.sockets.emit("DELETED_TASK", {
          columnId: col._id,
          taskIdx: idx
        })
    });
  }
}

module.exports = TaskController;
