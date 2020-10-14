const User = require("../models/User");

class UserController {
  async starBoard(io, socket, data) {
    const { userId, boardId } = data;
    const user = await User.findById(userId);
    // console.log(user.starredBoards, '----------------')
    // console.log(boardId, '---------------------------')
    const starredBoardObj = user.starredBoards
    // user.starredBoards[boardId] = (user.starredBoards[boardId]) ? false : true;
    starredBoardObj[boardId] = starredBoardObj[boardId] ? false : true
    // user.update({
    //     name: 'starredBoards'
    //   }, {
    //     $set: {
    //       boardId: true
    //     }
    //   },
    //   (err)=>console.log(err));

    const query = { _id: userId };
    // const boardKeyVal = {}
    // boardKeyVal[boardId] = true
    // User.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)

    // is sent as
    User.findByIdAndUpdate(userId, {
      $set: {
        [`starredBoards.[boardId]`]: true
      }
    },
    function (err, doc) {
      if (err) return res.send(500, {
        error: err
      });
      // return res.send('Succesfully saved.');
      console.log(doc)
      io.sockets.emit("UPDATE_USER_STARRED_BOARDS", {
        boardId,
        boolean: user.starredBoards[boardId]
      });
      // console.log(doc)
    })

    // user.save().then(user => {
    //   io.sockets.emit("UPDATE_USER_STARRED_BOARDS", {
    //     boardId,
    //     boolean: user.starredBoards[boardId]
    //   });
    // }).catch(err => console.log(err))
  }
}

module.exports = UserController;