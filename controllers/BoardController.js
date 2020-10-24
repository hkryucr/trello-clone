const Board = require("../models/Board");
const Column = require("../models/Column");
const Task = require("../models/Task");


class BoardController {
  async updateBoard(io, socket, data) {
    const { boardId, name } = data;
    const boardObj = await Board.findById(boardId);
    boardObj.name = name;
    boardObj.save().then((board) => {
      io.sockets.emit("UPDATE_BOARD", board);
    });
  }
  async deleteBoard(io, socket, data) {
    const { boardId } = data;
    const board = Board.find({_id: boardId})
    for (let i = 0; i < board.columns.length; i++) {
      Task.deleteMany({ column: board.columns[i]._id });
    }
    Board.remove({_id: boardId})
    Column.deleteMany({ board: boardId});
    board.save().then(board => {
      io.sockets.emit("DELETED_BOARD", board)
    })
  }
}

module.exports = BoardController;
