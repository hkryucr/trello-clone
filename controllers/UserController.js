import User from '../models/User'

class UserController {
  async starBoard(io, socket, data) {
    const { userId, boardId, boolean } = data;
    const user = await User.findById(userId);
    user.starredBoard[boardId] = boolean;
    user.save().then(user => {
      io.sockets.emit("UPDATE_USER_STARRED_BOARDS", user);
    });
  }
}

module.exports = UserController;