// create board
// delete board
// update board (name)

const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Board = require("../../models/Board");
const Column = require("../../models/Column");
const Task = require("../../models/Task");

router.get("/", async (req, res) => {
  console.log("the board route is running")
  const boards = await Board.find({})
  res.json(boards)
});

router.get("/:id", async (req, res) => {
  Board.findById(req.params.id)
    .populate([
      { 
        path: "columns", 
        model: "Column", 
        populate: {
          path: "tasks",
          model: "Task"
        }
      }
    ])
    .exec(function (err, board) {
      if (err) return res.status(404).json({
        noboardfound: "No board found with that id"
      });
      res.json(board);
    });
});

router.post("/", async (req, res) => {
  const user = await User.findById(req.body.user);
  const board = new Board({
    name: req.body.name,
    user: user
  });

  board.save().then((board) => {
    return res.status(200).json(board);
  }).catch((err) => {
    console.log(err);
  });
  return res.status(200).json(board);
})

// create a board the belongs to users 
router.post("/", async (req, res) => {
  console.log(req.user);
  console.log(req.body);

  const user = await User.findById(req.body.user); 

  if (!user) {
    return res.status(422).json("User not found!");
  }
  
  const board = new Board({name: req.body.name, user: user});

  board.save().then((board) => {
    return res.status(200).json(board);
  }).catch((err) => {
    console.log(err);
  }); 
  return res.status(200).json(board);
})

module.exports = router;
