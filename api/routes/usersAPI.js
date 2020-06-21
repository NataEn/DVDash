const express = require("express");
const router = express.Router();
const User = require("../modals/users");
const mongoConnect = require("../databases/mongodb/mongoServices").mongoConnect;
mongoConnect();
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
router.post("/register", (req, res, next) => {
  console.log(req.body);
  let form_details = {
    FirstName: req.body.FN,
    Email: req.body.mail,
    LastName: req.body.LN,
    Phone: req.body.Phone,
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
});

module.exports = router;
