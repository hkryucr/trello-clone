const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  columns: [{
    type: Schema.Types.ObjectId,
    ref: "Column"
  }],
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Board = mongoose.model("Board", BoardSchema);
