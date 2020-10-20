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
      toColumnId,
    } = data;
    const fromColumnObj = await Column.findById(fromColumnId);

    if (fromColumnId === toColumnId) {
      const taskToMove = fromColumnObj.tasks.splice(fromTask, 1)[0];
      fromColumnObj.tasks.splice(toTask, 0, taskToMove);
      fromColumnObj
        .save()
        .then((col1) => {
          io.sockets.emit("MOVE_TASK", {
            fromColumn,
            fromTask,
            toColumn,
            toTask,
          });
        })
        .catch((err) => {
          socket.emit("error", err);
        });
      // if its different columns
    } else {
      const toColumnObj = await Column.findById(toColumnId);
      const taskToMove = fromColumnObj.tasks.splice(fromTask, 1)[0];
      toColumnObj.tasks.splice(toTask, 0, taskToMove);
      fromColumnObj.save().then((col1) => {
        toColumnObj
          .save()
          .then((col2) => {
            io.sockets.emit("MOVE_TASK", {
              fromColumn,
              fromTask,
              toColumn,
              toTask,
            });
          })
          .catch((err) => {
            socket.emit("error", err);
          });
      });
    }
  }

  async createTask(io, socket, data) {
    const { name, columnId } = data;
    const column = await Column.findById(columnId);

    const task = new Task({
      name,
      column: columnId,
      board: column.board,
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
    Task.remove({_id: task._id})
    Column.findOneAndUpdate({_id: task.column}, {$pull: {tasks: task._id }}, {new: true}, function(err, col) {
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
