const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BackgroundSchema = new Schema({
  backgroundType: {
    type: String,
    required: true
  },
  template: {
    type: String,
    required: true
  }
})

module.exports = Background = mongoose.model("Background", BackgroundSchema)
