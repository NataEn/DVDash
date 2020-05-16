const express = require("express");
const router = express.Router();
const { connect } = require("../connections");

router.get("/", function (req, res, next) {
  connect();
  res.send("API is working properly");
});

module.exports = router;
