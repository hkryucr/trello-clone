const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");

router.get("/", async (req, res) => {
  const tasks = await Task.find({})
  res.json(tasks)
});

router.get("/:id", async (req, res) => {
  Task.findById(req.params.id)
    .then(tasks => {
      res.json(tasks);
    });
})

module.exports = router;
