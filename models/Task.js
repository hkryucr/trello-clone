const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Task = mongoose.model("Task", TaskSchema);
