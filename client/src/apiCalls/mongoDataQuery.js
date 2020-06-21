const registerUser = ({ firstName, lastName, email, phone, picture }) => {
  let fetchUrl = `${process.env.REACT_APP_APISERVER}/users/register?firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}&picture=${picture}`;
  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return data;
};
module.exports = {
  registerUser,
};
