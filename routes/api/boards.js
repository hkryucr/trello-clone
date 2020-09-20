const bodyParser = require("body-parser");
// create board
// delete board
// update board (name)
// 
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Board = require("../../models/Board");

// create a board the belongs to users 
// 
router.post("/", async (req, res) => {
  console.log(req.user);
  console.log(req.body);

  const user = await User.findById(req.body.user); 
  const board = new Board({name: req.body.name, user: user});

  board.save().then((board) => {
    return res.status(200).json(board);
  }).catch((err) => {
    console.log(err);
  }); 
  return res.status(200).json(board);
})

module.exports = router;