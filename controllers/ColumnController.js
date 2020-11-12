const Column = require("../models/Column");
const Board = require("../models/Board");
const Task = require("../models/Task")

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
      socket.broadcast.emit("MOVE_COLUMN", { fromColumnIndex, toColumnIndex });
    }).catch(err => {
      socket.emit("error", err);
    })
  }

  async updateColumn (io, socket, data) {
    const { columnId, name } = data;
    const columnObj = await Column.findById(columnId);
    columnObj.name = name; 
    columnObj.save().then((column) => {
      io.sockets.emit("UPDATE_COLUMN", columnObj);
    })
  }

  async deleteColumn (io, socket, { column, idx }) {
    await Column.remove({_id: column._id})
    await Task.deleteMany({column: column._id})
    await Board.findOneAndUpdate(
      { _id: column.board },
      { $pull: { columns: column._id } },
      { new: true },
      function (err, boards) {
        if (err) {
          res.send(err);
        }
        io.sockets.emit("DELETED_COLUMN", {
          boards,
          idx
        });
      }
    );
  }
}

module.exports = ColumnController;
