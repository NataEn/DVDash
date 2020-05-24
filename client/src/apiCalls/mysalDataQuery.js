const getTotalRevenue = () => {
  const data = fetch("http://localhost:3001/msqlapi/revenue_total")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return data;
};
const getWeekRevenue = () => {
  const week_data = fetch("http://localhost:3001/msqlapi/revenue_this_week")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return week_data;
};

module.exports = {
  getTotalRevenue,
  getWeekRevenue,
};
