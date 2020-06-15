const localUrl = window.location.href;
const getPeriodData = (options) => {
  let fetchUrl = `/mysqlapi/periodData?year=${options.year}%month=${options.month}&week=${options.week}&day=${options.day}`;
  if (localUrl === "http://localhost:3000/") {
    fetchUrl = `http://localhost:8082${fetchUrl}`;
  }
  const data = fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  console.log("periodData", data);
  return data;
};
const getTotals = (options) => {
  let fetchUrl = `/mysqlapi/totals?totals=${options.total}`;
  if (localUrl === "http://localhost:3000/") {
    fetchUrl = `http://localhost:8082${fetchUrl}`;
  }
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
  let fetchUrl = `/msqlapi/top10?filter=${filterChoice}`;
  if (localUrl === "http://localhost:3000/") {
    fetchUrl = `http://localhost:8082${fetchUrl}`;
  }
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
