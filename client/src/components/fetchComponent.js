function callAPI() {
  return fetch("http://localhost:3001/testAPI")
    .then((res) => res.text())
    .then((res) => res);
}
module.exports = {
  callAPI,
};
