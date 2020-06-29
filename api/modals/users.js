const mongoServices = require("../databases/mongodb/mongoServices");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  pkey: { type: String, unique: true },
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
  },
  picture: {
    type: Buffer,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("User", userSchema);
