import React, { useEffect, useState } from "react";
import Main from "./components/main";
import Header from "./components/header";
import {
  getPeriodData,
  getTop10,
  getGrandTotals,
} from "./apiCalls/mysqlDataQuery";
import { week_data, month_data } from "./utils";
import "./App.css";

function App() {
  const [totalRevenue, setTootalRevenue] = useState({});
  const [totalCustomers, setTotalCustomers] = useState({});
  const [weekRevenue, setWeekRevenue] = useState([]);
  const [weekCustomers, setWeekCustomers] = useState([]);
  const [topTen, setTopTen] = useState([]);
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [monthCustomersRents, setMonthCustomersRents] = useState([]);

  const fetchData = async () => {
    const totals = await getPeriodData({
      week: ["WEEK_REVENUE", "WEEK_CUSTOMERS", "WEEK_ORDERS"],
      month: ["MONTH_REVENUE", "MONTH_CUSTOMERS", "MONTH_ORDERS"],
      year: ["YEAR_REVENUE", "YEAR_CUSTOMERS", "YEAR_ORDERS"],
      total: ["TOTAL_REVENUE", "TOTAL_CUSTOMERS", "TOTAL_ORDERS"],
    });
    console.log("totals", totals);
    const week_revenue = week_data(totals[3]);
    const week_customers = week_data(totals[4]);
    const month_revenue = totals[1];
    const month_customers_rents = totals[2];

    setTootalRevenue(totals[0][0][0][0]);
    setTotalCustomers(totals[0][0][1][0]);
    setWeekRevenue(week_revenue);
    setWeekCustomers(week_customers);
    setMonthRevenue(month_revenue);
    setMonthCustomersRents(month_customers_rents);

    const top10 = await getTop10();
    setTopTen(top10);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Main
        className="App-main"
        data={{
          totalRevenue,
          totalCustomers,
          monthCustomersRents,
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
