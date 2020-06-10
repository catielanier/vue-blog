"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { model: User } = require("../users/userModel");
const { model: Comment } = require("../comments/commentModel");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  headerImage: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Comment,
    },
  ],
});

exports.model = mongoose.model("Post", postSchema);
