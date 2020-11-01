const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Board = require("../../models/Board");
const Background = require("../../models/Background");
const Column = require("../../models/Column");
const Task = require("../../models/Task");
const { populate } = require("../../models/Background");

router.get("/", async (req, res) => {
  const boards = await Board.find({})
  res.json(boards)
});

router.get("/search", async (req, res) => {
  const searchObj = JSON.parse(req.query.searchObj)
  const searchResult = {
    boards: [],
    tasks: []
  }
  await Board
    .find({ name: { $regex: `${searchObj.text}`, $options: "i" }, user: searchObj.userId })
    .populate('background')
    .then(data => {
      const boards = data.map(board => ({
        background: board.background,
        name: board.name,
        boardId: board._id
      }))
      searchResult.boards = boards

      Task
        .find({ name: { $regex: `${searchObj.text}`, $options: "i" }, user: searchObj.userId })
        .populate('board', 'name')
        .populate('column', 'name')
        .then(data => {
          const tasks = data.map(task => ({
            name: task.name,
            board: task.board,
            column: task.column,
            taskId: task._id
          }))
          searchResult.tasks = tasks
          res.json(searchResult)
        })
        .catch(e => res.status(404).json({
          noTaskFound: "No task can be searched with that input"
        }))        
    })
    .catch(e => res.status(404).json({
      noBoardFound: "No board can be searched with that input"
    }))
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
