const Board = require("../models/Board");
const Column = require("../models/Column");
const Task = require("../models/Task");
const User = require("../models/User")


class BoardController {
  async createBoard(io, socket, data) {
    const board = new Board(data)
    const user = await User.findById(data.user)
    board.save().then(board => {
      user.boards.push(board._id)
      const query = { _id: board.user };

      let sb = `starredBoards.${board._id}`;

      User.findByIdAndUpdate(query, {
        $set: {
          [sb]: false
        }
      }, { new: true },
        function (err, doc) {
          io.sockets.emit("UPDATE_USER_STARRED_BOARDS", {
            boardId: board._id,
            bool: false
          });
        })
      user.save()
      .then(user => {
        io.sockets.emit("CREATED_BOARD", board)
      })
      .catch(err => {
        io.sockets.emit("error", err)
      })
    })
    .catch(err => {
      io.sockets.emit("error", err)
    })
  }
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
    const board = await Board.findById(boardId)
    let sb = `starredBoards.${boardId}`;
    for (let i = 0; i < board.columns.length; i++) {
      await Task.deleteMany({ column: board.columns[i]._id });
    }
    await Column.deleteMany({ board: boardId});
    await Board.findOneAndDelete({_id: boardId})
    await User.findOneAndUpdate(
      {_id: board.user},
      { $pull: { boards: board._id }, $unset : { [sb]: false } },
      { new: true },
      function (err, user) {
        if (err) {
          res.send(err)
        }
        io.sockets.emit("DELETED_BOARD", boardId)
      })
  }
}

module.exports = BoardController;
