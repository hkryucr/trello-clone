const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  initials: {
    type: String,
    required: false
  },
  fullName: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: false
  },
  boards: [{
    type: Schema.Types.ObjectId,
    ref: "Board",
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
