import React, { useEffect, useState } from "react";
import Main from "./components/main";
import Header from "./components/header";
import { getPeriodData, getTop10, getTotals } from "./apiCalls/mysqlDataQuery";
import { week_data, month_data } from "./utils";
import "./App.css";

function App() {
  const [totalRevenue, setTootalRevenue] = useState({});
  const [totalCustomers, setTotalCustomers] = useState({});
  const [weekRevenue, setWeekRevenue] = useState([]);
  const [weekCustomers, setWeekCustomers] = useState([]);
  const [topTen, setTopTen] = useState([]);
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [monthCustomers, setMonthCustomers] = useState([]);

  const fetchPeriodData = async () => {
    const periodData = await getPeriodData({
      week: ["WEEK_REVENUE", "WEEK_CUSTOMERS", "WEEK_ORDERS"],
      month: ["MONTH_REVENUE", "MONTH_CUSTOMERS", "MONTH_ORDERS"],
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

  useEffect(() => {
    fetchPeriodData();
    fetchTotals();
    fetchTop10();
  }, []);

  return (
    <div className="App">
      <Header />
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
      <footer className="App-footer">footer</footer>
    </div>
  );
}

export default App;
