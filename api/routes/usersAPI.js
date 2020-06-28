const express = require("express");
const router = express.Router();
const User = require("../modals/users");

router.get("/", function (req, res, next) {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
router.post("/register", (req, res, next) => {
  console.log("in registaration");
  console.log(req.body);
  let form_details = {
    FirstName: req.body.firstname,
    Email: req.body.email,
    LastName: req.body.lastname,
    Phone: req.body.phone,
  };
  console.log(User);
  const user = new User(
    req.body.FN,
    req.body.LN,
    req.body.mail,
    req.body.Phone
  );
  user
    .save()
    .then((result) => {
      console.log("created new user");
      res.render("successful", { form_details: form_details });
    })
    .catch((err) => {
      console.error(err);
    });
  res.send("something");
});

module.exports = router;
