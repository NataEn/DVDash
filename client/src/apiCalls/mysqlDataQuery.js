const localUrl = window.location.href;
const getPeriodData = (options) => {
  let fetchUrl =
    process.env.REACT_APP_APISERVER +
    `/mysqlapi/periodData?year=${options.year}&month=${options.month}&week=${options.week}&day=${options.day}`;
  const data = fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  console.log("periodData", data);
  return data;
};
const getTotals = (totals) => {
  let fetchUrl = `${process.env.REACT_APP_APISERVER}/mysqlapi/totals?totals=${totals}`;
  const data = fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  console.log("totals", data);
  return data;
};
const getTop10 = (filterChoice) => {
  let filters = filterChoice ? filterChoice : [];
  let fetchUrl = `${process.env.REACT_APP_APISERVER}/msqlapi/top10?filter=${filters}`;
  const data = fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return data;
};

module.exports = {
  getPeriodData,
  getTop10,
  getTotals,
};
