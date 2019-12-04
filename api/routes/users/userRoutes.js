const express = require("express");
const router = express.Router();
const userService = require("./userServices");
const postService = require("../posts/postServices");
const tokenService = require("../../utils/tokenService");

router.route("/signup").post(async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body.data);
    res.status(201).json({
      data: [user]
    });
  } catch (e) {
    next(e);
  }
});

router.route("/login").post(async (req, res, next) => {
  try {
    const user = await userService.isUser(req.body.data);
    if (user) {
      const token = await tokenService.issueToken(user);
      res.status(200).json({
        data: {
          token,
          id: user._id
        }
      });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
});

router.route("/:id").get(async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    res.status(200).json({
      data: user
    });
  } catch (e) {
    next(e);
  }
});

router.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const { role, banned, user: adminId, token } = req.body;
  try {
    const loggedIn = await postService.loginCheck(token);
    if (loggedIn) {
      const user = await userService.getUserById(adminId);
      if (user.role === "Admin") {
        const updatedUser = await userService.updateUser(id, role, banned);
        res.status(201).json({
          data: updatedUser
        });
      }
    }
  } catch (e) {
    res.status(401).statusMessage(e);
  }
});

router.route("/").get(async (_, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      data: users
    });
  } catch (e) {
    res.status(400).statusMessage(e);
  }
});

exports.router = router;
