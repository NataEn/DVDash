const mysql = require("mysql2/promise");
const queryBuilder = require("./mysqlQueryBuilder");
const dbCredentials = {
  // host: "mysqldb://mysql:3306/mysql-test", //see if this is correct
  host: "localhost",
  user: "root",
  database: "sakila",
  multipleStatements: true,
  connectionLimit: 50,
  connectTimeout: 20000,
};
//get specific sql string from queryBuilder
const getSql = (dataType) => {
  const type = dataType.toUpperCase();

  if (dataType.includes("TOTAL_WEEK_")) {
    let weekType = dataType.split("_")[2]; //will return the week type: customers or revenue
    return queryBuilder[`TOTAL_WEEK_${weekType}`];
  }
  if (dataType.includes("TOTAL_")) {
    let totalType = dataType.split("_")[1]; //will return the 'total' type: customers or revenue
    return queryBuilder[`TOTAL_${totalType}`];
  }
};

//for single connection
async function connect() {
  const connection = await mysql.createConnection(dbCredentials);
  const [row, fields] = await connection.query("select 123");
  return row;
}

async function totals(params) {
  const pool = await mysql.createPool(dbCredentials);
  const promises = [];
  const totalsPromis = pool.query(
    queryBuilder.TOTAL_REVENUE + queryBuilder.TOTAL_CUSTOMERS
  );
  promises.push(totalsPromis);
  if (params.week) {
    const weekDataTypes = params.week.split(",");
    for (let weekDataType of weekDataTypes) {
      const sql = getSql(weekDataType);
      const dataTypePromis = pool.query(sql);
      promises.push(dataTypePromis);
    }
  }
  try {
    const totalsResults = await Promise.all(promises);
    console.log("sql results ", totalsResults);
    return totalsResults;
  } catch (err) {
    console.log(`totals error:${err}`);
  }
}

module.exports = {
  connect,
  totals,
};

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
