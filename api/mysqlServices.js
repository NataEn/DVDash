const mysql = require("mysql2/promise");
const { TOTAL_REVENUE, TOTAL_WEEK_REVENUE } = require("./mysqlQueryBuilder");
const dbCredentials = {
  // host: "mysqldb://mysql:3306/mysql-test", //see if this is correct
  host: "localhost",
  user: "root",
  database: "sakila",
};
//for single connection
async function connect() {
  const connection = await mysql.createConnection(dbCredentials);
  const [row, fields] = await connection.query("select 123");
  return row;
}

async function totalRevenue() {
  const connection = await mysql.createConnection(dbCredentials);
  const [row, fields] = await connection.query(TOTAL_REVENUE);
  console.log("total revenue", row);
  return row;
}
async function weekRevenue() {
  const connection = await mysql.createConnection(dbCredentials);
  const [row, fields] = await connection.query(TOTAL_WEEK_REVENUE);
  return row;
}

module.exports = { connect, totalRevenue, weekRevenue };

async function executeNewQuery(params) {
  const pool = await mysql.createPool(dbCredentials);
  const promises = [];
  console.log("params for query", params);
  const { sql, values } = buildQuery.newQuery("onomagic_events", params);
  const resultPromise = pool.query(sql, values);
  promises.push(resultPromise);

  if (params.compareInterval !== "null") {
    compareParams = calculateCompareParams(params);
    console.log("params for compare query", compareParams);
    const { sql, values } = buildQuery.newQuery(
      "onomagic_events",
      compareParams
    );
    const compareResultPromise = pool.query(sql, values);
    promises.push(compareResultPromise);
  }
  try {
    const comparedResults = await Promise.all(promises);
    console.log(
      "sql results timezone start",
      comparedResults[0][0],
      comparedResults[0][0][0].rangeStart
    );
    return comparedResults;
  } catch (err) {
    console.log(`executeNewQuery error:${err}`);
  }
}
