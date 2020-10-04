const express = require("express");
const mongoose = require("mongoose");
const { router: postRouter } = require("./_routes/posts/postRoutes");
const { MONGODB_URI } = process.env; // set up db connection

mongoose.connect(MONGODB_URI);
mongoose.Promise = global.Promise;

const app = express(); // no need to route only /book requests; that's done in now.json

exports.handler = function(event, context, callback) {
  app.use("/api/posts", postRouter); // just export the app instead of starting up the server
};

app.use("/api/posts", postRouter); // just export the app instead of starting up the server

module.exports = app;
