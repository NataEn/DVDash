const express = require("express");
const router = express.Router();
const { totals, weekRevenue, weekCustomers } = require("../mysqlServices");

router.get("/totals", async function (req, res, next) {
  console.log("request", req.query);
  const dataTotals = await totals(req.query);
  console.log(dataTotals);
  res.json(dataTotals);
});

router.get("/revenue_this_week", async function (req, res, next) {
  const week_revenue = await weekRevenue();
  res.json(week_revenue);
});
router.get("/customers_this_week", async function (req, res, next) {
  const week_customers = await weekCustomers();
  res.json(week_customers);
});

module.exports = router;
