const moment = require("moment");
const week_data = (data) => {
  const days_of_week = moment.weekdays();
  const dataObj = data.reduce((obj, item) => {
    obj[item["day_name"]] = item;
    return obj;
  }, {});

  console.log("total data from week func", dataObj);
  const list = days_of_week.map((day, index) => {
    const day_value = dataObj[day]
      ? Number(dataObj[day]["revenue"] || Number(dataObj[day]["total_count"]))
      : 0;
    return {
      name: day,
      value: day_value,
    };
  });
  console.log(list);
  return list;
};

const titleCase = (string) => {
  const severalWords = string.split(" ");
  let titleString = "";
  for (let word of severalWords) {
    titleString += `${word[0].toUpperCase()}${word.slice(1).toLowerCase()} `;
  }
  return titleString;
};
const utils = {
  week_data,
  titleCase,
};
export default utils;
