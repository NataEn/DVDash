const axios = require("axios");
const signinUser = async ({ email, password }) => {
  let fetchUrl = `http://localhost:8080/users/login`;
  console.log("logged in user", { email, password });
  axios
    .post(fetchUrl, { email, password })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const registerUser = async ({
  firstName,
  lastName,
  email,
  phone,
  picture,
  password,
}) => {
  console.log(
    "posting data",
    firstName,
    lastName,
    email,
    phone,
    picture,
    password
  );

  let fetchUrl = `http://localhost:8080/users/register`;
  axios
    .post(fetchUrl, {
      firstName,
      lastName,
      email,
      phone,
      picture,
      password,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
module.exports = {
  registerUser,
  signinUser,
};
