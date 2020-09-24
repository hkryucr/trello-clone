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
  // initials: {
  //   type: String,
  //   required: true
  // },
  fullName: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  // bio: {
  //   type: String,
  //   required: false
  // },
=======
  bio: {
    type: String,
    required: false
  },
  boards: [{
    type: Schema.Types.ObjectId,
    ref: "Board",
  }],
>>>>>>> master
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
