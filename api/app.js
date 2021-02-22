const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoService = require("./databases/mongodb/mongoServices").mongoConnect();
const usersRouter = require("./routes/usersAPI");
const users = require("./controllers/users");

const testAPIRouter = require("./routes/testAPI");
const mysqlRouter = require("./routes/mysqlAPI");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use("/testAPI", testAPIRouter);
// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static(path.join(__dirname, "../client/build")));
// }

const static =
  process.env.STATIC_PATH || path.join(__dirname, "../client/build");

app.use("/", express.static(static));
// app.use("/mysqlapi", users.authenticationToken, mysqlRouter);
app.use("/mysqlapi", mysqlRouter);

app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err, message: err.message });
});

module.exports = app;
