import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import { UsaData } from "../../mapChartData";
import { isoWorldIds } from "../../isoCodes";

const createMap = (chart, selectedCountry) => {
  console.log("chart", chart);
  chart.chartContainer.percentHeight = "30";
  // chart.contentHeight = "20rem";
  chart.geodata = am4geodata_usaLow;
  chart.projection = new am4maps.projections.AlbersUsa();
  const polygonSeries = createPolygonSeries(chart);

  // Set up heat legend
  const heatLegend = createHeatLegend(chart, polygonSeries);
  //connect events on chart and heatLegend
  polygonSeries.mapPolygons.template.events.on("over", (event) => {
    handleHoverChart(event.target, heatLegend);
  });
  polygonSeries.mapPolygons.template.events.on("hit", (event) => {
    handleHoverChart(event.target, heatLegend);
  });
};

const createPolygonSeries = (chart) => {
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
  // Configure series tooltip
  const polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText =
    "country: {name}\n value: {value}\n customers: {customers}";
  polygonTemplate.nonScalingStroke = true;
  polygonTemplate.strokeWidth = 0.5;
  console.log("polygonTemplate", polygonTemplate);

  // Create hover state and set alternative fill color
  const hs = polygonTemplate.states.create("hover");
  console.log("polygonTemplate states", polygonTemplate.states);
  hs.properties.fill = am4core.color("#3c5bdc");
  polygonTemplate.events.on("hit", function (ev) {
    console.log("clicked on", ev);
    ev.target.series.chart.zoomToMapObject(ev.target);
  });
  return polygonSeries;
};
const handleHoverChart = (mapPolygon, heatLegend) => {
  if (!isNaN(mapPolygon.dataItem.value)) {
    heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
  } else {
    heatLegend.valueAxis.hideTooltip();
  }
};
const createHeatLegend = (chart, polygonSeries) => {
  const heatLegend = chart.createChild(am4maps.HeatLegend);
  heatLegend.series = polygonSeries;
  heatLegend.align = "center";
  heatLegend.valign = "bottom";
  heatLegend.width = am4core.percent(90);
  heatLegend.height = am4core.percent(40);
  heatLegend.marginRight = am4core.percent(2);
  heatLegend.valueAxis.renderer.minGridDistance = 100;
  heatLegend.minValue = 0;
  heatLegend.maxValue = 10000000;

  // Set up custom heat map legend labels using axis ranges
  const minRange = heatLegend.valueAxis.axisRanges.create();
  minRange.value = heatLegend.minValue;
  // minRange.label.text = "A little";
  const maxRange = heatLegend.valueAxis.axisRanges.create();
  maxRange.value = heatLegend.maxValue;
  // maxRange.label.text = "A lot!";
  maxRange.label.fontSize = "1rem";
  debugger;
  console.log(
    " heatLegend.valueAxis.renderer.labels.template",
    heatLegend.valueAxis.renderer.labels.template
  );

  //  Internal heat legend value axis labels
  heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function (
    labelText
  ) {
    return `${labelText}`;
  });
  return heatLegend;
};

export default createMap;
