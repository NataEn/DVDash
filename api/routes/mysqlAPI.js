const express = require("express");
const router = express.Router();
const {
  totals,
  periodData,
  weekRevenue,
  weekCustomers,
  top10,
} = require("../mysqlServices");

router.get("/periodData", async function (req, res, next) {
  console.log("request", req.query);
  const dataTotals = await periodData(req.query);
  res.json(dataTotals);
});
router.get("/totals", async function (req, res, next) {
  console.log("request", req.query);
  const dataTotals = await totals(req.query);
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
router.get(`/top10`, async function (req, res, next) {
  const top10Items = await top10(req.query);
  res.json(top10Items[0]);
});

module.exports = router;
