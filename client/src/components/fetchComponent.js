function callAPI() {
  return fetch("http://localhost:9000/testAPI")
    .then((res) => res.text())
    .then((res) => res);
}
module.exports = {
  callAPI,
};
