// const dotenv = require("dotenv").config({ path: "../../../.env" });
// if (dotenv.error) {
//   console.error(dotenv.error);
// }
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const DVDash_DB = {
  dbName: "DVDash",
  _db: "",
  users_collection: "DVDash_users",
};

// console.log(
//   "local test variable: ",
//   process.env.TEST_VAR,
//   "app's variable",
//   process.env.DVDASH_TEST_VAR
// );

//connect to local mongoDB
const mongoConnect = (cbFunc) => {
  MongoClient.connect(
    `mongodb://127.0.0.1:27017/${DVDash_DB.dbName}`,
    // `${process.env.MONGODB_URL}${dbName}`,
    { appname: "DVDash" },
    (err, client) => {
      if (err) {
        console.log(`MongoDB Error: ${err}${process.env.MONGODB_URL}`);
      } else {
        // console.log(process.env.TEST_VAR);
        if (cbFunc) {
          cbFunc(client);
        }

        DVDash_DB._db = client.db(DVDash_DB.dbName);

        // client.close();
      }
    }
  );
};
const getDb = () => {
  if (DVDash_DB._db === "") {
    throw "No Mongo Database found";
  }
  return DVDash_DB._db;
};
module.exports = {
  mongoConnect,
  getDb,
};
