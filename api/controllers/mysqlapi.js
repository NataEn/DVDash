const {
  totals,
  periodData,
  areaData,
  weekRevenue,
  weekCustomers,
  top10,
} = require("../databases/mysql/mysqlServices");
const utils = require("../utils");

const getAreaData = async (req, res, next) => {
  console.log("in getarea middleweare", req.query.filter);
  const data = await areaData(req.query.filter);
  res.json(data);
};
const getPeriodData = async (req, res, next) => {
  try {
    const dataTotals = await periodData(req.query);
    //combined objects for periodData.month.customers
    const newdataTotals = utils.combine_objects_list(
      dataTotals.month.customers,
      "month_name",
      "store_id"
    );
    dataTotals.month.customers = newdataTotals;
    res.json(dataTotals);
  } catch (ex) {
    console.error("get perioddata error", ex);
    res.status(500).json([]);
  }
};
const getTotals = async (req, res, next) => {
  const dataTotals = await totals(req.query);
  res.json(dataTotals);
};

const getTop10 = async (req, res, next) => {
  const top10Items = await top10(req.query);

  // console.log("befor sending to client", top10Items);
  res.json(top10Items);
};

module.exports = {
  getAreaData,
  getPeriodData,
  getTotals,
  getTop10,
};
