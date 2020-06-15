const mysql = require("mysql2/promise");
const queryBuilder = require("./mysqlQueryBuilder");
const dbCredentials = {
  // host: "mysqldb://mysql:3306/mysql-test", //see if this is correct
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: "sakila",
  multipleStatements: true,
  connectionLimit: 10,
  connectTimeout: 1000,
};

const pool = mysql.createPool(dbCredentials);

//get specific sql string from queryBuilder
const getSql = (dataType, timeExtent = null) => {
  const type = dataType.toUpperCase();
  let queryType = type.split("_")[1];
  return queryBuilder[`${timeExtent}_${queryType}`];
};

//for single connection
async function connect() {
  const connection = await mysql.createConnection(dbCredentials);
  const [row, fields] = await connection.query("select 123");
  return row;
}
const arrangeResults = (resultsArr) => {
  //removing buffer array
  const noBuffersResults = [];
  for (let result of resultsArr) {
    noBuffersResults.push(result[0]);
  }
  console.log(noBuffersResults);
  const objectOfTotalResults = {};
  const keys = ["total", "year", "month", "week"];
  //construct an object of results
  for (let i = 0; i < noBuffersResults.length; i++) {
    if (i === 0) {
      const revenue = noBuffersResults[i][0];
      const customers = noBuffersResults[i][1];
      const orders = noBuffersResults[i][2];
      objectOfTotalResults[keys[i]] = {
        revenue: revenue,
        customers: customers,
        orders: orders,
      };
    }
  }

  return objectOfTotalResults;
};

async function totals(params) {
  const promises = [];
  const totalDataTypes = params.total.split(",");
  for (let totalDataType of totalDataTypes) {
    const sql = getSql(totalDataType, "");
    const dataTypePromis = pool.query(sql);
    promises.push(dataTypePromis);
  }
  try {
    const totalsResults = await Promise.all(promises);
    const arrangedResults = arrangeResults(totalsResults);
    console.log("sql results ", arrangedResults);
    return arrangedResults;
  } catch (err) {
    console.log(`totals error:${err}`);
  }
}

async function periodData(params) {
  const promises = [];
  if (params.total) {
  }
  if (params.year) {
    const yearDataTypes = params.year.split(",");
    for (let yearDataType of yearDataTypes) {
      const sql = getSql(yearDataType, "YEAR");
      const dataTypePromis = pool.query(sql);
      promises.push(dataTypePromis);
    }
  }
  if (params.month) {
    const monthDataTypes = params.month.split(",");
    for (let monthDataType of monthDataTypes) {
      const sql = getSql(monthDataType, "MONTH");
      const dataTypePromis = pool.query(sql);
      promises.push(dataTypePromis);
    }
  }
  if (params.week) {
    const weekDataTypes = params.week.split(",");
    for (let weekDataType of weekDataTypes) {
      const sql = getSql(weekDataType, "WEEK");
      const dataTypePromis = pool.query(sql);
      promises.push(dataTypePromis);
    }
  }
  try {
    const periodDataResults = await Promise.all(promises);
    const arrangedResults = arrangeResults(periodDataResults);
    console.log("sql results periodData", arrangedResults);
    return arrangedResults;
  } catch (err) {
    console.log(`periodData error:${err}`);
  }
}
async function top10(param) {
  const top10Promis = pool.query(queryBuilder.TOP_10);

  try {
    const top10Result = await top10Promis;
    console.log("sql results: top10", top10Result);
    return top10Result;
  } catch (err) {
    console.log(`totals error:${err}`);
  }
}

module.exports = {
  connect,
  periodData,
  totals,
  top10,
};
