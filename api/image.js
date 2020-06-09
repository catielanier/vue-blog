const express = require("express");
const { router: imageRouter } = require("./_routes/image/imageRoute");

const app = express(); // no need to route only /book requests; that's done in now.json

app.use("/api/image", imageRouter); // just export the app instead of starting up the server

module.exports = app;
