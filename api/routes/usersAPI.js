const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../modals/users");

router.get("/", function (req, res, next) {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
router.post("/login", async (req, res, next) => {
  const enteredPassword = req.query.password || req.body.password;
  const foundUser = await User.findOne(
    { email: req.query.email || req.body.email },
    (err, foundUser) => {
      if (err) console.log(err);
    }
  );

  const msg = await bcrypt.compare(enteredPassword, foundUser.password);

  console.log("compared passwords", msg);
  res.json({ message: msg });
});
router.post("/register", async (req, res, next) => {
  console.log("in registaration");
  User.findOne({ firstName: req.body.firstName }, async (err, foundUser) => {
    let msg;
    if (err) console.log(err);
    if (foundUser) {
      msg = "user exists";
      console.log("This has already been saved");
    } else {
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 5);
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        email: req.body.email,
        picture: req.body.picture,
        age: req.body.age,
      });
      user
        .save()
        .then((result) => {
          msg = "created user";
          console.log("created new user");
        })
        .catch((err) => {
          console.error("got error from saving new user: ", err);
        });
    }

    res.json({ messag: msg });
  });
});

module.exports = router;
