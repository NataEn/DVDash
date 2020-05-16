const mysql = require("mysql2/promise");
const dbCredentials = {
  // host: "mysqldb://mysql:3306/mysql-test", //see if this is correct
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "sakila",
  connectTimeout: 15000,
  timezone: "utc",
};
async function connect() {
  try {
    const connection = await mysql.createConnection(dbCredentials);
    const actorsdata = await connection.query(
      "SELECT * FROM actor",
      (actors) => {
        console.table("actors:", actors);
      }
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connect };

async function executeNewQuery(params) {
  const pool = await mysql.createPool(dbCredentials);
  //const db = await mysql.createConnection(dbCredentials);
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
