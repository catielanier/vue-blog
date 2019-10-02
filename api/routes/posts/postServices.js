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
    const posts = await Post.find({});
    if (posts) {
      return posts;
    }
  } catch (e) {
    throw e;
  }
};
