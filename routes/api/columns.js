const express = require("express");
const router = express.Router();
const Column = require("../../models/Column");

router.get("/", async (req, res) => {
  const columns = await Column.find({})
  res.json(columns)
});

router.get("/:id", async (req, res) => {
  Column.findById(req.params.id)
    .then(column => {
      res.json(column);
    });
});

// export function createColumn({name, boardId}) {
//   const column = new Column({name, board: boardId});
//   column.save().then( (col) => {    
//   })
// }

module.exports = router;
