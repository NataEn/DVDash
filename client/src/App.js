import React, { useEffect, useState } from "react";
import Main from "./components/main";
import { callAPI } from "./components/fetchComponent";
import Header from "./components/header";
import "./App.css";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const runEffect = async () => {
      const data = await callAPI();
      setData(data);
    };
    runEffect();
  }, [setData]);

  return (
    <div className="App">
      <Header />
      <Main className="App-main" />
      <footer className="App-footer">footer</footer>
      <p>{data}</p>
    </div>
  );
}

export default App;
