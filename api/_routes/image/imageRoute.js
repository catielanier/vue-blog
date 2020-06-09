const express = require("express");
const router = express.Router();
const axios = require("axios");
const middleWare = require("../../_middleware");
const { applyMiddleware } = require("../../_utils");

applyMiddleware(middleWare, router);

router.route("/").post(async (req, res) => {
  console.log(req);
});

exports.router = router;
