import React, { useEffect, useState } from "react";
import Main from "./components/main";
import Header from "./components/header";
import { getTotals, getTop10 } from "./apiCalls/mysqlDataQuery";
import { week_data } from "./utils";
import "./App.css";

function App() {
  const [totalRevenue, setTootalRevenue] = useState({});
  const [totalCustomers, setTotalCustomers] = useState({});
  const [weekRevenue, setWeekRevenue] = useState([]);
  const [weekCustomers, setWeekCustomers] = useState([]);
  const [topTen, setTopTen] = useState([]);

  const fetchData = async () => {
    const totals = await getTotals({
      week: ["TOTAL_WEEK_REVENUE", "TOTAL_WEEK_CUSTOMERS"],
    });
    const week_revenue = week_data(totals[1][0]);
    const week_customers = week_data(totals[2][0]);
    setTootalRevenue(totals[0][0][0][0]);
    setTotalCustomers(totals[0][0][1][0]);
    setWeekRevenue(week_revenue);
    setWeekCustomers(week_customers);

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
