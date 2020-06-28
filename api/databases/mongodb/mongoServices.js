const dotenv = require("dotenv").config();
if (dotenv.error) {
  console.error(dotenv.error);
}
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const MongoClient = mongodb.MongoClient;
const DVDash_MONGO = {
  dbName: "DVDash",
  _connection: "",
  users_collection: "DVDash_users",
};
const mongoOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: false,
};
// `mongodb://127.0.0.1:27017/${DVDash_MONGO.dbName}`,
// const mongoUri = `${process.env.MONGODB_URL}/${DVDash_MONGO.dbName}`;
const mongoUri = ` mongodb://localhost:27017/DVDash`;
console.log(
  "local test variable: ",
  process.env.TEST_VAR,
  "app's variable",
  process.env.DVDASH_TEST_VAR
);

//connect to local mongoDB
const mongoConnect = async () => {
  const connection = await mongoose.connect(mongoUri, mongoOptions, (err) => {
    if (err) {
      console.log(`Mongoose Error: ${err}${process.env.MONGODB_URL}`);
    } else {
      console.log("Mongo connected on:", mongoUri);
    }
  });
  DVDash_MONGO._connection = connection;
};
// const getDb = () => {
//   if (DVDash_MONGO._connection === "") {
//     throw "No Mongo Database found";
//   }
//   return DVDash_MONGO._connection;
// };
module.exports = {
  mongoConnect,
  // getDb,
};
