const Board = require("../models/Board");

class BoardController {
  async updateBoard(io, socket, data) {
    // EDIT_BOARD
    // edits name in Boards
    // removes name in Boards
    // socket.on("editBoard", function (data) {
    //   /*
    //   --receiving
    //   _id:
    //   name:

    //   --responding POJO
    //   {
    //     _id:
    //     name:
    //     user: (not populate)
    //   }
    //   */
    const { boardId, name } = data;
    const boardObj = await Board.findById(boardId);
    boardObj.name = name;
    boardObj.save().then((board) => {
      console.log("board updated", board);
      io.sockets.emit("UPDATE_BOARD", board);
    });
  }
}

module.exports = BoardController;
