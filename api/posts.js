const express = require("express");
const mongoose = require("mongoose");
const { router: postRouter } = require("./routes/posts/postRoutes");
const { MONGO_URI } = process.env; // set up db connection

mongoose.connect(MONGO_URI);
mongoose.Promise = global.Promise;

const app = express(); // no need to route only /book requests; that's done in now.json

app.use("/api/posts", postRouter); // just export the app instead of starting up the server

module.exports = app;
