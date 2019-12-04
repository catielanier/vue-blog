"use strict";

// Imports and defs
const express = require("express");
const router = express();

// Middleware
const { URL, PORT } = require("./utils/constants");
const middleWare = require("./middleware");
const { applyMiddleware } = require("./utils");

applyMiddleware(middleWare, router);

// Routes
const { router: userRouter } = require("./routes/users/userRoutes");
const { router: postRouter } = require("./routes/posts/postRoutes");
const { router: commentRouter } = require("./routes/comments/commentRoutes");

router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/comments", commentRouter);

router.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    const errors = [{ message: "unauthorized" }];
    res.status(401).json({ errors });
  }
});

module.exports = router;
