require("dotenv");
const jwt = require("jsonwebtoken");
const register = (req, res, next) => {};
const login = (req, res, next) => {};

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("authenticaion", authHeader);
  if (token === null) {
    return res.json({ message: "not authorized", authorized: false });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("authorization err", err);
    }
  });
};

module.exports = {
  authenticationToken,
  register,
  login,
};
