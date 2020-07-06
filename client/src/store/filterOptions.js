const AREA_FILTERS = [
  { value: 10, name: "Residental proximity" },
  { value: 20, name: "Gender" },
  { value: 30, name: "Rental Rate" },
  {
    value: 40,
    name: `Rental rate vs Proximity to Branch (make pie chart with inner and
    outer radius`,
  },
];
const TOP_10_FILTERS = [
  { value: "janre1", name: "janre1" },
  { value: "janre2", name: "janre2" },
  { value: "janre3", name: "janre3" },
];
const COUNTRIES = [
  { value: "1", name: "country1" },
  { value: "2", name: "country2" },
  { value: "3", name: "country3" },
];
const STORE_CUSTOMERS_FILTERS = [
  { value: "customers_weman", name: "Total customers- Weman" },
  { value: "customers_men", name: "Total customers- Men" },
  { value: "customers", name: "Total customers" },
];
const STORE_RENTS_FILTERS = [
  { value: "customers_weman", name: "Total customers- Weman" },
  { value: "customers_men", name: "Total customers- Men" },
  { value: "customers", name: "Total customers" },
];
const STORE_FILTERS = [
  { value: "customers", name: "Total customers" },
  { value: "rents", name: "Total rents" },
];

module.exports = {
  AREA_FILTERS,
  TOP_10_FILTERS,
  COUNTRIES,
  STORE_FILTERS,
  STORE_RENTS_FILTERS,
  STORE_CUSTOMERS_FILTERS,
};
