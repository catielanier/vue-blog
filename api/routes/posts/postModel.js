const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  }
});

exports.model = mongoose.model("Post", postSchema);
