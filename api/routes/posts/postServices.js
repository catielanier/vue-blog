const tokenService = require("../../utils/tokenService");
const { model: Post } = require("./postModel");

exports.loginCheck = async token => {
  if (!token) {
    next(new Error("invalid request"));
  } else {
    try {
      const decoded = await tokenService.verifyToken(token);
      if (decoded) {
        return true;
      } else {
        console.error(`Not logged in`);
      }
    } catch (e) {
      console.error(e);
    }
  }
};

exports.createPost = async post => {};
