// create board
// delete board
// update board (name)

const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Board = require("../../models/Board");
const Background = require("../../models/Background");
const Column = require("../../models/Column");
const Task = require("../../models/Task");
const { populate } = require("../../models/Background");

router.get("/", async (req, res) => {
  console.log("the board route is running")
  const boards = await Board.find({})
  res.json(boards)
});

router.get("/search", async (req, res) => {
  const searchObj = JSON.parse(req.query.searchObj)
  Board
    .find({ name: { $regex: `^${searchObj.text}`, $options: "i" }, user: searchObj.userId })
    .populate('background')
    .then(data => {
      const formated = data.map(datum => ({
        background: datum.background,
        name: datum.name,
        boardId: datum._id
      }))
      res.json(formated)
    })
    .catch(e => res.status(404).json({
      noboardfound: "No board can be searched with that input"
    }))
  // ({
  //   $text: 'asd'
  // }).then(products => res.json(products)).catch(e => res.status(404).json({
  //     noboardfound: "No board can be searched with that input"
  //   }));
  // }).exec(function(err, docs) { res.json(docs) });
})

router.get("/:id", async (req, res) => {
  await Board.findById(req.params.id)
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
    .populate("background")
    .exec(function (err, board) {
      if (err) return res.status(404).json({
        noboardfound: "No board found with that id"
      });
      res.json(board);
    });
});


module.exports = router;
