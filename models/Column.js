const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: "Task"
  }],
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Column = mongoose.model("Column", ColumnSchema);
