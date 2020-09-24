const Board = require("../models/Board");

class BoardController {
  async editBoard(io, socket, data) {
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
    const { _id, name } = data;
    const board = await Board.findById(_id);
    if (board == null) {
      socket.emit("error", "Board not found!");
    }

    board.name = name;
    board.save().then((board) => {
      console.log("board updated", board);
      io.sockets.emit("newBoard", board);
    });
  }
}

module.exports = BoardController;
