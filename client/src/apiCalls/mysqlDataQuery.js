const localUrl = window.location.href;
const getPeriodData = (options) => {
  let fetchUrl =
    process.env.REACT_APP_APISERVER +
    `/mysqlapi/periodData?year=${options.year}&month=${options.month}&week=${options.week}`;
  const data = fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return data;
};
const getTotals = (totals) => {
  let fetchUrl = `${process.env.REACT_APP_APISERVER}/mysqlapi/totals?totals=${totals}`;
  const data = fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return data;
};
const getTop10 = (filterChoice) => {
  // let filters = filterChoice ? filterChoice : "defined";
  let fetchUrl = `${process.env.REACT_APP_APISERVER}/mysqlapi/top10`;
  const data = fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => data);
  return data;
};
const getAreaData = (filterChoice) => {
  let fetchUrl = `${process.env.REACT_APP_APISERVER}/mysqlapi/areaData?filter=${filterChoice}`;
  const data = fetch(fetchUrl)
    .then((response) => response.json)
    .then((data) => data);
  return data;
};

module.exports = {
  getPeriodData,
  getTop10,
  getTotals,
  getAreaData,
};
