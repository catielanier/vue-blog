const express = require('express');
const router = express.Router();
const userServices = require('../users/userServices');
const postServices = require('../posts/postServices');
const commentServices = require('./commentServices');

router.route('/new').post(async (req, res) => {
  const { token, user, comment, postId } = req.body;
  const loggedIn = await postServices.loginCheck(token);

  // We could refactor these branching if/elses to improve readability
  if (!loggedIn) {
    return res.status(401).statusMessage('You are not logged in.');
  }

  const commentUser = await userServices.getUserById(user);
  // this await shouldn't be needed
  const banned = commentUser.banned;
  if (banned) {
    return res
      .status(401)
      .statusMessage('You have been banned and cannot post comments.');
  }

  const newComment = await commentServices.createComment(comment);
  if (!newComment) {
    return res.status(401).statusMessage('Comment not created.');
  }

  const commentId = newComment._id;
  const relationship = await commentServices.linkCommentToPost(
    commentId,
    postId
  );
  if (relationship) {
    return res.status(201).json({
      data: newComment,
    });
  }

  return res
    .status(401)
    .statusMessage('Relationship not made between comment and blog post.');
});

router.route('/:id').delete(async (req, res) => {
  const { token, user, postId } = req.body;
  const { id: commentId } = req.params;
  // Check to see if logged in.
  const loggedIn = await postServices.loginCheck(token);
  if (!loggedIn) {
    res.status(401).statusMessage('You are not logged in.');
  }
  // Check to see if admin, or owner of comment.
  const deletingUser = await userServices.getUserById(user);
  const commentToDelete = await commentServices.getCommentById(commentId);
  if (deletingUser.role !== 'Admin' && commentToDelete.user !== user) {
    res
      .status(401)
      .statusMessage('You do not have permission to delete this comment.');
  }
  // Remove comment relation from post.
  // Delete comment.
  const deletedComment = await commentServices.deleteComment(commentId, postId);
  if (deletedComment) {
    res.status(201).json({
      data: deletedComment,
    });
  }
});

exports.router = router;
