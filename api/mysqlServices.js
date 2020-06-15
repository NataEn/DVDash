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
const getSql = (dataType,timeExtent=null) => {
  const type = dataType.toUpperCase();
switch(timeExtent){
  case "WEEK":
    let weekType = dataType.split("_")[2]; //will return the week type: customers or revenue
    return queryBuilder[`TOTAL_WEEK_${weekType}`];
  
  case "MONTH":
    let monthType = dataType.split("_")[2]; //will return the week type: customers or revenue
    return queryBuilder[`TOTAL_MONTH_${monthType}`];
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
  const promises = [];
  const totalsPromis = pool.query(
    queryBuilder.TOTAL_REVENUE + queryBuilder.TOTAL_CUSTOMERS
  );
  promises.push(totalsPromis);
  if (params.week) {
    const weekDataTypes = params.week.split(",");
    for (let weekDataType of weekDataTypes) {
      const sql = getSql(weekDataType,"WEEK");
      const dataTypePromis = pool.query(sql);
      promises.push(dataTypePromis);
    }
    if(params.month){
      const weekDataTypes = params.month.split(",");
    for (let monthDataType of monthDataTypes) {
      const sql = getSql(monthDataType);
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
  totals,
  top10,
};
