const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const server = require("./api/server");
const { PORT, MONGODB_URI } = require("./api/utils/constants");

server.use(express.static(path.resolve(__dirname, "dist")));
server.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

mongoose.connect(MONGODB_URI);

server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
