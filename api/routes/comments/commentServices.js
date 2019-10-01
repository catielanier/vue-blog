const { model: Comment } = require("./commentModel");

exports.createComment = async newComment => {
  try {
    const comment = new Comment(newComment);
    return await comment.save();
  } catch (e) {
    throw e;
  }
};
