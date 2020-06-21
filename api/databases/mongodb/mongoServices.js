const mongodb = require("mongodb");
const dotenv = require("dotenv").config({ path: "../../.env" });
const MongoClient = mongodb.MongoClient;
const dbName = "123";

//connect to local mongoDB
const mongoConnect = () => {
  MongoClient.connect(
    process.env.MONGODB_URL,
    { appname: "DVDash" },
    (err, client) => {
      if (err) console.log(`MongoDB Error: ${err}`);
      console.log(`connected to mongodb ${client}`);
      db = client.db(dbName);
    }
  );
};
module.exports{
    mongoConnect
}
