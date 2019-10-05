const express = require("express");
const router = express.Router();
const postServices = require("./postServices");
const userServices = require("../users/userServices");

router.route("/new").post(async (req, res) => {
  const { token, user: id, post } = req.body;
  const loggedIn = await postServices.loginCheck(token);
  if (loggedIn) {
    const user = await userServices.getUserById(id);
    const hasPermission =
      (await user.role) === "Admin" || user.role === "Author";
    if (hasPermission) {
      const newPost = await postServices.createPost(post);
      res.status(201).json({
        data: [newPost]
      });
    } else {
      res
        .status(401)
        .statusMessage(`You are not allowed to write a new blog post!`);
    }
  } else {
    res.status(401).statusMessage(`You are not logged in.`);
  }
});

router.route("/").get(async (_, res) => {
  try {
    const posts = await postServices.getAllPosts();
    res.status(200).json({
      data: posts
    });
  } catch (e) {
    res.status(400).statusMessage(e);
  }
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postServices.getPostsById(id);
    res.status(200).json({
      data: post
    });
  } catch (e) {
    res.status(400).statusMessage(e);
  }
});

router.route("/:id").delete(async (req, res) => {
  const { token, user } = req.body;
  const { id: postId } = req.params;
  // Check if logged in
  const loggedIn = await postServices.loginCheck(token);
  if (!loggedIn) {
    res.status(401).statusMessage("You are not logged in.");
  }
  // Grab post
  const post = await postServices.getPostsById(postId);
  const deletingUser = await userServices.getUserById(user);
  // Check to see if post is owned by user, or if user is Admin.
  if (deletingUser !== "Admin") {
    if (post.user !== user) {
      res
        .status(401)
        .statusMessage("You do not have permission to delete this post.");
    }
  }
  // Run through comments and delete them.
  // Delete post.
});

exports.router = router;
