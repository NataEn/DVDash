const mysql = require("mysql2/promise");
const queryBuilder = require("./mysqlQueryBuilder");
const dbCredentials = {
  // host: "mysqldb://mysql:3306/mysql-test", //see if this is correct
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: "sakila",
  multipleStatements: true,
  connectionLimit: 50,
  queueLimit: 100,
};

const pool = mysql.createPool(dbCredentials);

//get specific sql string from queryBuilder
const getSql = (dataType) => {
  let sql = "";
  const type = dataType.toUpperCase();
  let timeExtent = type.split("_")[0];
  let queryType = type.split("_")[1];
  const queryfunction = queryBuilder[`${timeExtent}_${queryType}`];
  console.log("query function", queryfunction);
  sql = timeExtent === "TOTAL" ? queryfunction : queryfunction();
  return sql;
};

//for single connection
async function connect() {
  const connection = await mysql.createConnection(dbCredentials);
  const [row, fields] = await connection.query("select 123");
  return row;
}

const getOptionFromResultKeys = (options, keys) => {
  console.log("options: ", options, "keys: ", keys);
  for (let option of options) {
    const optionRgEx = new RegExp(option, "i");
    optionExists = keys.some((key) => {
      return optionRgEx.test(key);
    });
    if (optionExists) {
      console.log("existing option", option);
      return option;
    }
  }
};

const removeNonDataArrays = (resultsArr, dataName) => {
  const cleanedArr = [];
  for (let resultSet of resultsArr) {
    if (dataName === "totals" || dataName === "periodData") {
      cleanedArr.push(resultSet[0]);
    } else if (dataName === "top10") {
      cleanedArr.push(resultsArr[0]);
      break;
    } else if (!dataName) {
      cleanedArr.push(resultsArr[0]);
      break;
    }
  }
  return cleanedArr;
};

const getKeysObj = (resultsName) => {
  const keysObj = {
    subjects: ["customers", "orders", "revenue"],
  };

  if (resultsName === "periodData") {
    keysObj.periods = ["year", "month", "week"];
  } else if (resultsName === "totals") {
    keysObj.periods = ["total"];
  } else if (resultsName === "top10") {
    keysObj.periods = ["top"];
    keysObj.subjects = ["category", "actor", "title"];
  }
  return keysObj;
};

const arrangeResults = (resultsName, resultsArr) => {
  //removing buffer array
  const noBuffersResults = removeNonDataArrays(resultsArr, resultsName);
  const { periods, subjects } = getKeysObj(resultsName);
  const resultObj = {};
  //construct an object of results
  for (let i = 0; i < noBuffersResults.length; i++) {
    let timePeriod, resultSubject;
    let item =
      noBuffersResults[i][0].constructor.name === "TextRow"
        ? noBuffersResults[i][0]
        : noBuffersResults[i][0][0];
    let keys = Object.keys(item);
    //get the time period result
    timePeriod = getOptionFromResultKeys(periods, keys);
    //create key if not exists
    if (!resultObj[timePeriod]) {
      resultObj[timePeriod] = {};
    }
    //save results according to subject
    for (let j = 0; j < subjects.length; j++) {
      let item =
        noBuffersResults[i][0].constructor.name === "TextRow"
          ? noBuffersResults[i][0]
          : noBuffersResults[i][j][0];
      let keys = Object.keys(item);
      resultSubject = getOptionFromResultKeys(subjects, keys);
      resultObj[timePeriod][resultSubject] =
        noBuffersResults[i][j] || noBuffersResults[i];
    }
    if (resultsName.includes("STORE")) {
      console.log("includes Store");
    }
  }

  return resultObj;
};

async function totals(params) {
  const promises = [];
  const totalDataTypes = params.totals.split(",");
  for (let totalDataType of totalDataTypes) {
    const sql = queryBuilder[totalDataType]();
    const dataTypePromis = pool.query(sql);
    promises.push(dataTypePromis);
  }
  try {
    const totalsResults = await Promise.all(promises);
    const arrangedResults = arrangeResults("totals", totalsResults);
    return arrangedResults;
  } catch (err) {
    console.log(`totals error:${err}`);
  }
}

async function periodData(params) {
  const promises = [];
  for (let key in params) {
    if (params[key] !== "undefined") {
      const periodTypes = params[key].split(",");
      let sql = "";
      for (let type of periodTypes) {
        const period = type.split("_")[0];
        sql += queryBuilder[type]();
      }
      const dataTypePromis = pool.query(sql);
      promises.push(dataTypePromis);
    }
  }
  try {
    const periodDataResults = await Promise.all(promises);
    const arrangedResults = arrangeResults("periodData", periodDataResults);
    return arrangedResults;
  } catch (err) {
    console.log(`periodData error:${err}`);
  }
}
async function top10(filterParams) {
  const sql = queryBuilder.TOP_10();
  try {
    const top10Result = await pool.query(sql);
    const arrangedResults = arrangeResults("top10", top10Result);
    return arrangedResults;
  } catch (err) {
    console.error(`top10 error:${err}`);
  }
}
async function areaData(filter) {
  const sql = queryBuilder.AREA_DATA();
  try {
    const data = await pool.query(sql);
    const cleanedData = removeNonDataArrays(data)[0];
    return cleanedData;
  } catch (err) {
    console.error(`area data error:${err}`);
  }
}
module.exports = {
  connect,
  periodData,
  totals,
  top10,
  areaData,
  removeNonDataArrays,
};
