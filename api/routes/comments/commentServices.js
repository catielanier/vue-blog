const { model: Comment } = require("./commentModel");
const { model: Post } = require("../posts/postModel");

exports.createComment = async newComment => {
  try {
    const comment = new Comment(newComment);
    return await comment.save();
  } catch (e) {
    throw e;
  }
};

exports.linkCommentToPost = async (commentId, postId) => {
  try {
    return await Post.findByIdAndUpdate(
      { _id: postId },
      {
        $push: {
          comments: {
            _id: commentId
          }
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

exports.getCommentById = async commentId => {
  try {
    return await Comment.findById({ _id: commentId }).populate({
      path: "user",
      select: "username _id"
    });
  } catch (e) {
    throw e;
  }
};

exports.deleteComment = async (commentId, postId) => {
  try {
    await Post.findByIdAndUpdate(
      { _id: postId },
      { $pull: { comments: { _id: commentId } } }
    );
    return await Comment.findByIdAndDelete({ _id: commentId });
  } catch (e) {
    throw e;
  }
};

exports.editComment = async (id, body) => {
  try {
    return await Comment.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          body
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

exports.deleteAllComments = async comments => {
  try {
    return await Comment.deleteMany({
      _id: comments
    });
  } catch (e) {
    throw e;
  }
};
