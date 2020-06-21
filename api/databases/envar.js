const dotenv = require("dotenv");
const result = dotenv.config({ path: "../../.env" });

if (result.error) {
  console.error(result.error);
}

// console.log("all DVDash-defined env. vars: ", result.parsed);

console.log(
  "local test variable: ",
  process.env.TEST_VAR,
  "app's variable",
  process.env.DVDASH_TEST_VAR
);
