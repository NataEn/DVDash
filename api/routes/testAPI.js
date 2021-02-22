const express = require("express");
const router = express.Router();
const { connect } = require("../databases/mysql/mysqlServices");

router.get("/", async function (req, res, next) {
  const data = await connect();
  // const dataValue = data[0][123];
  res.send(`API is working properly from test api, data: ${123}`);
});

module.exports = router;
