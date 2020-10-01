const Board = require("../models/Board");

class BoardController {
  async updateBoard(io, socket, data) {
    const { boardId, name } = data;
    const boardObj = await Board.findById(boardId);
    boardObj.name = name;
    boardObj.save().then((board) => {
      io.sockets.emit("UPDATE_BOARD", board);
    });
  }
}

module.exports = BoardController;
