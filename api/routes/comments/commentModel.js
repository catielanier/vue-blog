const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  commentDate: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

exports.model = mongoose.model("Comment", commentSchema);
