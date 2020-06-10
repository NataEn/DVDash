const localUrl = window.location.href;
const getTotals = (options) => {
  let fetchUrl = `/msqlapi/totals?month=${options.month}&week=${options.week}&day=${options.day}`;
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
  getTotals,
  getTop10,
};
