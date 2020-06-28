const mongoServices = require("../databases/mongodb/mongoServices");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("User", userSchema);
// class User {
//   constructor(firstName, lastName, email, phone, picture) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.phone = phone;
//     this.picture = picture;
//   }
//   save() {
//     console.log("got data from client to save");
//     const db = mongoServices.getDb();
//     return db
//       .collection("DVDash_users")
//       .insertOne(this)
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => console.error("mongo save user: ", err));
//   }
// }
// module.exports = User;
