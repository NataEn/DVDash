const week_revenue_data = (data) => {
  debugger;
  console.log("total data", data);
  const list = data.map((item) => {
    return {
      name: item["day_name"],
      value: Number(item["revenue"]),
    };
  });
  console.log(list);
  return list;
};
module.exports = {
  week_revenue_data,
};
