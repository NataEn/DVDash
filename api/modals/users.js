const getDb = require("../databases/mongodb/mongoServices");

class User {
  constructor(firstName, lastName, email, phone, picture) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.picture = picture;
  }
  save() {
    const db = getDb();
    db.collection("DVDash_users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error("mongo save user: ", err));
  }
}
module.export = User;
