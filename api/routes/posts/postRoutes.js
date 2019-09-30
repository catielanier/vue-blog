const express = require("express");
const router = express.Router();
const postServices = require("./postServices");
const userServices = require("../users/userServices");

router.route("/new").post(async (req, res, next) => {
  res.status(201).json({
    data: req
  });
});

exports.router = router;
