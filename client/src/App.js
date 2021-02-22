import React, { useEffect, useState } from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {
  getPeriodData,
  getTop10,
  getTotals,
  getAreaData,
} from "./apiCalls/mysqlDataQuery";
import Users from "./apiCalls/mongoDataQuery";

import { getCountries } from "./apiCalls/worldCountries";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";

function App() {
  const [totalRevenue, setTotalRevenue] = useState({});
  const [totalCustomers, setTotalCustomers] = useState({});
  const [weekRevenue, setWeekRevenue] = useState([]);
  const [weekCustomers, setWeekCustomers] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [topItemsFilter, setTopItemsFilter] = useState("actor");
  const [topItemsTitle, setTopItemsTitle] = useState("Actors");
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [monthCustomers, setMonthCustomers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("United States");
  const [areaData, setAreaData] = useState([]);
  const [areaDataReq, setAreaDataReq] = useState("gender");
  const [filteredAreaData, setFilteredAreaData] = useState({});
  const [storeFilter, setStoreFilter] = useState("customers");
  const [storeSubFilter, setStoreSubFilter] = useState();
  const [storeData, setStoreData] = useState([]);

  const fetchPeriodData = async () => {
    debugger;
    const periodData = await getPeriodData({
      week: ["WEEK_REVENUE", "WEEK_CUSTOMERS", "WEEK_ORDERS"],
      month: ["MONTH_REVENUE", "MONTH_CUSTOMERS_STORE", "MONTH_ORDERS"],
      year: ["YEAR_REVENUE", "YEAR_CUSTOMERS", "YEAR_ORDERS"],
    });
    console.log("periodData", periodData);
    setWeekRevenue(periodData.week && periodData.week.revenue);
    setWeekCustomers(periodData.week && periodData.week.customers);
    setMonthRevenue(periodData.month && periodData.month.revenue);
    setMonthCustomers(periodData.month && periodData.month.customers);
    setStoreData(periodData.month && periodData.month.customers);
  };
  const fetchTop10 = async () => {
    const top10 = await getTop10();
    setTopItems(top10.top);
  };
  const fetchTotals = async () => {
    const totals = await getTotals([
      "TOTAL_REVENUE",
      "TOTAL_CUSTOMERS",
      "TOTAL_ORDERS",
    ]);
    setTotalRevenue(totals.total.revenue[0]);
    setTotalCustomers(totals.total.customers[0]);
  };
  const fetchCountries = async () => {
    const countries = await getCountries();
    setCountries([...countries]);
  };
  const fetchAreaData = async () => {
    const data = await getAreaData(areaDataReq);
    setAreaData(data);
  };
  const filtereAreaData = () => {
    console.log("in filter data", areaData);
    const filteredData = areaData.find((item) => item.country === country);
    return filteredData;
  };
  useEffect(() => {
    let title = "";
    if (topItemsFilter === "title") title = "Movies";
    else if (topItemsFilter === "category") title = "Janres";
    else title = "Actors";
    setTopItemsTitle(title);
  }, [topItemsFilter]);

  useEffect(() => {
    fetchPeriodData();
    fetchTotals();
    fetchTop10();
    fetchCountries();
    fetchAreaData();
    setTopItemsFilter("actor");
  }, []);

  useEffect(() => {
    console.log(`requested ${areaDataReq} for ${country}`);
    fetchAreaData();
  }, [areaDataReq]);

  useEffect(() => {
    console.log("selected country", country);
    const filteredData = filtereAreaData();
    setFilteredAreaData(filteredData);
    console.log("selected country", country, filteredData);
  }, [country, areaDataReq, areaData]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login signinUser={Users.signinUser} />
          </Route>
          <Route path="/register">
            <Register registerUser={Users.registerUser} />
          </Route>
          <Route path="/">
            {!loggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Dashboard
                className="App-main"
                data={{
                  totalRevenue,
                  totalCustomers,
                  monthCustomers,
                  monthRevenue,
                  weekCustomers,
                  weekRevenue,
                  topItems,
                  topItemsFilter,
                  setTopItemsFilter,
                  topItemsTitle,
                  countries,
                  setCountry,
                  country,
                  areaData,
                  filteredAreaData,
                  areaDataReq,
                  setAreaDataReq,
                  storeFilter,
                  setStoreFilter,
                  storeSubFilter,
                  setStoreSubFilter,
                  storeData,
                }}
              />
            )}
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
