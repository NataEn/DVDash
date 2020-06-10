import React, { Component, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import { UsaData } from "../mapChartData";
import { isoWorldIds } from "../isoCodes";
am4core.useTheme(am4themes_animated);

export default function Map() {
  const { country, setCountry } = useState("usa");
  let chart;
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
  const createMap = (chart, selectedCountry) => {
    chart.geodata = am4geodata_usaLow;
    chart.projection = new am4maps.projections.AlbersUsa();
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    //Set min/max fill color for each area
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: chart.colors.getIndex(1).brighten(1),
      max: chart.colors.getIndex(1).brighten(-0.3),
    });

    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;

    // Set heatmap values for each state
    polygonSeries.data = UsaData;

    // Set up heat legend
    let heatLegend = chart.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.align = "center";
    heatLegend.valign = "bottom";
    heatLegend.width = am4core.percent(80);
    heatLegend.marginRight = am4core.percent(4);
    heatLegend.minValue = 0;
    heatLegend.maxValue = 40000000;

    // Set up custom heat map legend labels using axis ranges
    const minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.value = heatLegend.minValue;
    minRange.label.text = "A little";
    const maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.value = heatLegend.maxValue;
    maxRange.label.text = "A lot!";

    // Blank out internal heat legend value axis labels
    heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function (
      labelText
    ) {
      return "";
    });

    // Configure series tooltip
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create("hover");
    console.log("states", polygonTemplate.states);
    hs.properties.fill = am4core.color("#3c5bdc");
    polygonTemplate.events.on("hit", function (ev) {
      console.log("clicked on", ev);
      ev.target.series.chart.zoomToMapObject(ev.target);
    });
  };

  useEffect(() => {
    const chart = am4core.create("chartdiv", am4maps.MapChart);
    createMap(chart, country);
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  });

  return (
    <div>
      123456
      <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}
