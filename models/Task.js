const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  column: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  // userAssigned: {
  //   type: Schema.Types.ObjectId,
  //   default: null
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Task = mongoose.model("Task", TaskSchema);
