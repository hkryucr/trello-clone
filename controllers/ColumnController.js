const Column = require("../models/Column");
const Board = require("../models/Board");

class ColumnController {
  async createColumn(io, socket, data) {
    const { name, boardId } = data
    const board = await Board.findById(boardId);
    const column = new Column({
      name,
      board: boardId
    });
    
    column.save().then((column) => {
      board.columns.push(column._id);
      board.save()
        .then(board => {
          io.sockets.emit("CREATE_COLUMN", column);
        })
        .catch(err => {
          socket.emit("error", err);
        })
    });
  }

  async moveColumn (io, socket, data) {
    const { fromColumnIndex, toColumnIndex, boardId } = data;
    const boardObj = await Board.findById(boardId);
    const columnToMove = boardObj.columns.splice(fromColumnIndex, 1)[0]
    boardObj.columns.splice(toColumnIndex, 0, columnToMove)
    boardObj.save().then(board => {
      io.sockets.emit("MOVE_COLUMN", { fromColumnIndex, toColumnIndex });
    }).catch(err => {
      socket.emit("error", err);
    })
  }
  // async createTask(io, socket, data) {
  //   const { name, columnId } = data;
  //   const column = await Column.findById(columnId);
  //   const task = new Task({
  //     name,
  //     column: columnId
  //   })

  //   task.save().then(task => {
  //     column.tasks.push(task._id);
  //     column.save()
  //       .then(column => {
  //         task.columnId = columnId
  //         io.sockets.emit("CREATE_TASK", task);
  //       }).catch(err => {
  //         socket.emit("error", err);
  //       })
  //   })
  // }
}

module.exports = ColumnController;
