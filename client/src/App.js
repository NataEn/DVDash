import React, { useEffect, useState } from "react";
import Main from "./components/main";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { getPeriodData, getTop10, getTotals } from "./apiCalls/mysqlDataQuery";
import { getCountries } from "./apiCalls/worldCountries";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";

function App() {
  const [totalRevenue, setTootalRevenue] = useState({});
  const [totalCustomers, setTotalCustomers] = useState({});
  const [weekRevenue, setWeekRevenue] = useState([]);
  const [weekCustomers, setWeekCustomers] = useState([]);
  const [topTen, setTopTen] = useState([]);
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [monthCustomers, setMonthCustomers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [countries, setCountries] = useState([]);

  const fetchPeriodData = async () => {
    const periodData = await getPeriodData({
      week: ["WEEK_REVENUE", "WEEK_CUSTOMERS", "WEEK_ORDERS"],
      month: ["MONTH_REVENUE", "MONTH_CUSTOMERS_STORE", "MONTH_ORDERS"],
      year: ["YEAR_REVENUE", "YEAR_CUSTOMERS", "YEAR_ORDERS"],
    });
    console.log("periodData", periodData);
    setWeekRevenue(periodData.week.revenue);
    setWeekCustomers(periodData.week.customers);
    setMonthRevenue(periodData.month.revenue);
    setMonthCustomers(periodData.month.customers);
  };
  const fetchTop10 = async () => {
    const top10 = await getTop10();
    console.log("top10", top10.top);
    setTopTen(top10.top);
  };
  const fetchTotals = async () => {
    const totals = await getTotals([
      "TOTAL_REVENUE",
      "TOTAL_CUSTOMERS",
      "TOTAL_ORDERS",
    ]);
    setTootalRevenue(totals.total.revenue[0]);
    setTotalCustomers(totals.total.customers[0]);
    console.log("totals", totals);
  };
  const fetchCountries = async () => {
    const countries = await getCountries();
    setCountries([...countries]);
  };

  useEffect(() => {
    fetchPeriodData();
    fetchTotals();
    fetchTop10();
    fetchCountries();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            {!loggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Main
                className="App-main"
                data={{
                  totalRevenue,
                  totalCustomers,
                  monthCustomers,
                  monthRevenue,
                  weekCustomers,
                  weekRevenue,
                  topTen,
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
