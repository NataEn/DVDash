const express = require("express");
const router = express.Router();
const { totalRevenue, weekRevenue } = require("../mysqlServices");

router.get("/revenue_total", async function (req, res, next) {
  const revenue = await totalRevenue();
  res.json(revenue);
});
router.get("/revenue_this_week", async function (req, res, next) {
  const week_revenue = await weekRevenue();
  res.json(week_revenue);
});

module.exports = router;
