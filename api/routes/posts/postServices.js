const tokenService = require("../../utils/tokenService");
const { model: Post } = require("./postModel");

exports.loginCheck = async token => {
  if (!token) {
    console.error(`Not logged in`);
    return false;
  } else {
    try {
      const decoded = await tokenService.verifyToken(token);
      if (decoded) {
        return true;
      } else {
        console.error(`Not logged in`);
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }
};

exports.createPost = async newPost => {
  try {
    const post = new Post(newPost);
    return await post.save();
  } catch (e) {
    throw e;
  }
};

exports.getAllPosts = async () => {
  try {
    const posts = await Post.find({})
      .populate("user", "username _id")
      .populate({
        path: "comments",
        populate: { path: "user", select: "username _id" }
      });
    if (posts) {
      return posts;
    }
  } catch (e) {
    throw e;
  }
};

exports.getPostsById = async id => {
  try {
    const post = await Post.findById(id)
      .populate({
        path: "comments",
        populate: { path: "user", select: "username _id" }
      })
      .populate("user", "username _id");
    if (post) {
      return post;
    }
  } catch (e) {
    throw e;
  }
};

exports.editPost = async (id, title, body) => {
  try {
    return await Post.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          body
        }
      }
    );
  } catch (e) {
    throw e;
  }
};

exports.deletePost = async id => {
  try {
    return await Post.findByIdAndDelete({
      _id: id
    });
  } catch (e) {
    throw e;
  }
};
