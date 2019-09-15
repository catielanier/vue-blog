"use strict";

const mongoose = require("mongoose");
const express = require("express");
const http = require("http");

const router = express();

const { URL, PORT } = require("./utils/constants");
const middleWare = require("./middleware");
const { applyMiddleware } = require("./utils");
const { router: userRouter } = require("./routes/users/userRoutes");

applyMiddleware(middleWare, router);

router.use("/api/users", userRouter);

const server = http.createServer(router);

mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
