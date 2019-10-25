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
        const commentId = newComment._id;
        const relationship = await commentServices.linkCommentToPost(
          commentId,
          postId
        );
        const addedComment = await commentServices.getCommentById(commentId);
        if (relationship) {
          res.status(201).json({
            data: addedComment
          });
        } else {
          res
            .status(401)
            .statusMessage(
              "Relationship not made between comment and blog post."
            );
        }
      } else {
        res.status(401).statusMessage("Comment not created.");
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

router.route("/:id").delete(async (req, res) => {
  const { token, user, postId } = req.body;
  const { id: commentId } = req.params;
  // Check to see if logged in.
  const loggedIn = await postServices.loginCheck(token);
  if (!loggedIn) {
    res.status(401).statusMessage("You are not logged in.");
  }
  // Check to see if admin, or owner of comment.
  const deletingUser = await userServices.getUserById(user);
  const commentToDelete = await commentServices.getCommentById(commentId);
  if (deletingUser.role !== "Admin") {
    if (commentToDelete.user !== user) {
      res
        .status(401)
        .statusMessage("You do not have permission to delete this comment.");
    }
  }
  // Remove comment relation from post.
  // Delete comment.
  const deletedComment = await commentServices.deleteComment(commentId, postId);
  if (deletedComment) {
    res.status(201).json({
      data: deletedComment
    });
  }
});

router.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const { user: userId, token, body } = req.body;
  const loggedIn = await postServices.loginCheck(token);
  if (!loggedIn) {
    res.status(401).statusMessage("You are not logged in.");
  }
  const editedComment = await commentServices.editComment(id, body);
  const commentToUpdate = await commentServices.getCommentById(id);
  if (editedComment) {
    res.status(201).json({
      data: commentToUpdate
    });
  }
});

exports.router = router;
