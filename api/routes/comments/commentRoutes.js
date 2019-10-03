const express = require("express");
const router = express.Router();
const userServices = require("../users/userServices");
const postServices = require("../posts/postServices");
const commentServices = require("./commentServices");

router.route("/new").post(async (req, res) => {
  const { token, user, comment, postId } = req.body;
  const loggedIn = await postServices.loginCheck(token);

  if (loggedIn) {
    const commentUser = await userServices.getUserById(user);
    const banned = await commentUser.banned;
    if (!banned) {
      const newComment = await commentServices.createComment(comment);
      if (newComment) {
      }
    } else {
      res
        .status(401)
        .statusMessage("You have been banned and cannot post comments.");
    }
  } else {
    res.status(401).statusMessage("You are not logged in.");
  }
});
