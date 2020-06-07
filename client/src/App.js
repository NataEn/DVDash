import React, { useEffect, useState } from "react";
import Main from "./components/main";
import Header from "./components/header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Main className="App-main" />
      <footer className="App-footer">footer</footer>
    </div>
  );
}

export default App;
