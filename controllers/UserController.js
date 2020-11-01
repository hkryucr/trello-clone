const User = require("../models/User");

class UserController {
  async starBoard(io, socket, data) {
    const { userId, boardId, bool } = data;
    const query = { _id: userId };
    
    let sb = `starredBoards.${boardId}`;
    
    User.findByIdAndUpdate(query, {
      $set: {
        [sb]: !bool
      }
    }, { new: true },
    function (err, doc) {
      io.sockets.emit("UPDATE_USER_STARRED_BOARDS", {
        boardId,
        bool: !bool
      });
    })
  }
}

module.exports = UserController;