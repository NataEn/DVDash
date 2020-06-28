const axios = require("axios");

const registerUser = async ({
  firstName,
  lastName,
  email,
  phone,
  picture,
  password,
}) => {
  debugger;
  console.log(
    "posting data",
    firstName,
    lastName,
    email,
    phone,
    picture,
    password,
    process.env.REACT_APP_APISERVER
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
};
