const express = require("express");
const router = express.Router();
const Background = require("../../models/Background");
const fs = require('fs');

router.get("/", async (req, res) => {
  const bg = await Background.find({})
  res.json(bg.reverse())
});

router.get("/:id", async (req, res) => {
  Background.findById(req.params.id)
    .then(bg => res.json(bg))
    .catch(er => res.status(404).json({
        noBackgroundFound: "No background found with that id"
      }))
});

module.exports = router;
