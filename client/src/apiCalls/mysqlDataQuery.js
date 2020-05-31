const getTotals = () => {
  const data = fetch("http://localhost:3001/msqlapi/totals")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return data;
};
const getWeekData = () => {
  const week_data = fetch(
    "http://localhost:3001/msqlapi/week? data=revenue,customers"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return week_data;
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
const getWeekCustomers = () => {
  const week_data = fetch("http://localhost:3001/msqlapi/customers_this_week")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return week_data;
};

module.exports = {
  getWeekRevenue,
  getWeekCustomers,
  getTotals,
  getWeekData,
};
