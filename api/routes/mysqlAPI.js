const express = require("express");
const utils = require("../utils");
const {
  getAreaData,
  getPeriodData,
  getTotals,
  getTop10,
} = require("../controllers/mysqlAPI");
const router = express.Router();
router.get("/periodData", getPeriodData);
router.get("/totals", getTotals);
router.get("/top10", getTop10);
router.get("/area_data", getAreaData);

module.exports = router;
