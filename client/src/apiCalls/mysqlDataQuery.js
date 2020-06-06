const getTotals = (options) => {
  const data = fetch(
    `http://localhost:3001/msqlapi/totals?month=${options.month}&week=${options.week}&day=${options.day}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return data;
};

module.exports = {
  getTotals,
};
