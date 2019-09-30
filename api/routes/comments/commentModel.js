const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model: User } = require("../users/userModel");

const commentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  commentDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  }
});

exports.schema = commentSchema;

exports.model = mongoose.model("Comment", commentSchema);
