var express = require("express");
var router = express.Router();

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
  res.render("successful", { form_details: form_details });
});

module.exports = router;
