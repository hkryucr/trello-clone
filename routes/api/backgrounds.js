const express = require("express");
const router = express.Router();
const Background = require("../../models/Background");
const fs = require('fs');

router.get("/", async (req, res) => {
  const bg = await Background.find({})
  res.json(bg)
});

router.get("/:id", async (req, res) => {
  Background.findById(req.params.id)
    .then(bg => res.json(bg))
    .catch(er => res.status(404).json({
        noBackgroundFound: "No background found with that id"
      }))
});

// router.get("/seed", async (req, res) => {
//   const bg = JSON.parse(fs.readFileSync("seed/background_data.json"));
//   for (let i = 0; i < bg.length; i++) {
//     const curBG = bg[i]
//     const bgObj = new Background({
//       backgroundType: curBG.backgroundType,
//       template: curBG.template
//     })
//     await bgObj.save()
//   }
//   const allBG = await Background.find({})
//   res.json(allBG)
// })
module.exports = router;
