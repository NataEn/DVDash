import React, { useEffect, useState, useContext } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { AuthContext } from "./Contexts/Auth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Store from "./Pages/Store/Store";
import {
  getTrendingMovies,
  getTrendingByGenres,
  getNewMovies,
  getGenresList,
} from "./apiCalls/movies";
import {
  getPeriodData,
  getTop10,
  getTotals,
  getAreaData,
} from "./apiCalls/mysqlDataQuery";
import Users from "./apiCalls/mongoDataQuery";

import { getCountries } from "./apiCalls/worldCountries";

import "./App.css";

function App() {
  const { loggedIn } = useContext(AuthContext);
  const [totalRevenue, setTotalRevenue] = useState({});
  const [totalCustomers, setTotalCustomers] = useState({});
  const [weekRevenue, setWeekRevenue] = useState([]);
  const [weekCustomers, setWeekCustomers] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [topItemsFilter, setTopItemsFilter] = useState("actor");
  const [topItemsTitle, setTopItemsTitle] = useState("Actors");
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [monthCustomers, setMonthCustomers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("United States");
  const [areaData, setAreaData] = useState([]);
  const [areaDataReq, setAreaDataReq] = useState("gender");
  const [filteredAreaData, setFilteredAreaData] = useState({});
  const [storeFilter, setStoreFilter] = useState("customers");
  const [storeSubFilter, setStoreSubFilter] = useState();
  const [storeData, setStoreData] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [moviesSelectedByGenre, setMoviesSelectedByGenre] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [genre, setGenre] = useState({ value: "Adventure", id: 12 });

  console.log("firebase", process.env.REACT_APP_FIREBASE_API_KEY);
  const fetchTrendingMovies = async () => {
    const movies = await getTrendingMovies();
    console.log("trending movies", movies);
    setTrendingMovies(movies);
  };
  const fetchNewMovies = async () => {
    const movies = await getNewMovies();
    console.log("new movies", movies);
    setNewMovies(movies);
  };
  const fetchGenreList = async () => {
    const genres = await getGenresList();
    setGenreList(genres);
  };
  const fetchMoviesByGenre = async () => {
    const movies = await getTrendingByGenres(genre.id);
    console.log("genre movies", movies);
    setMoviesSelectedByGenre(movies);
  };
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
    fetchMoviesByGenre();
  }, [genre]);

  useEffect(() => {
    fetchTrendingMovies();
    fetchNewMovies();
    fetchGenreList();
    fetchMoviesByGenre();
  }, []);
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
  }, [loggedIn]);

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
      <Header loggedIn={loggedIn} />
      <div> {loggedIn ? "logged in" : "logged out"}</div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/store" />
        </Route>
        <Route exact path="/store">
          <Store
            trendingMovies={trendingMovies}
            newMovies={newMovies}
            trendingByGenres={moviesSelectedByGenre}
            selectGenre={setGenre}
            genres={genreList}
            genre={genre.value}
          />
        </Route>
        <Route path="/login">
          <Login signinUser={Users.signinUser} />
        </Route>
        <Route path="/register">
          <Register registerUser={Users.registerUser} />
        </Route>
        <Route path="/dashboard">
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
    </div>
  );
}

export default App;
