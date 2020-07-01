import React, { Component, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import createMap from "./MapComponents";

am4core.useTheme(am4themes_animated);

const Map = () => {
  const { country, setCountry } = useState("usa");

  useEffect(() => {
    const chart = am4core.create("chartdiv", am4maps.MapChart);
    createMap(chart, country);
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, []);
  const onCountryChange = (e) => {
    setCountry(
      {
        countrySelected: e.target.value,
      },
      () => {
        // getting the id
        let id = document.getElementById("barChartDiv");
        console.log("id =>", id);
      }
    );
  };

  return (
    <>
      <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>
    </>
  );
};
export default Map;
