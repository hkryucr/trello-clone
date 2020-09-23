const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
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
