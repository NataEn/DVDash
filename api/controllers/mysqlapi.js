const { areaData } = require("../databases/mysql/mysqlServices");
const getAreaData = async (req, res, next) => {
  console.log("in getarea middleweare");
  const data = await areaData(req.query.filter);
  res.json(data);
};

module.exports = {
  getAreaData,
};
