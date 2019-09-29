const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model: User } = require("../users/userModel");
const { model: Comment } = require("../comments/commentModel");

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  comments: [Comment]
});

exports.model = mongoose.model("Post", postSchema);
