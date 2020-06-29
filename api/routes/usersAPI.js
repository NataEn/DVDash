const express = require("express");
const router = express.Router();
const User = require("../modals/users");

router.get("/", function (req, res, next) {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
router.post("/register", (req, res, next) => {
  console.log("in registaration");
  User.findOne({ firstName: req.body.firstName }, function (err, result) {
    if (err) console.log(err);
    if (result) {
      console.log("This has already been saved", result);
    } else {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        picture: req.body.picture,
        age: req.body.age,
      });
      user
        .save()
        .then((result) => {
          console.log("created new user");
        })
        .catch((err) => {
          console.error("got error from saving new user: ", err);
        });
    }

    res.send("something");
  });
});

module.exports = router;
