import React, { Component, useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ColumnGrid = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...props.data]);
    console.log("month data", props.data);
  }, []);
  console.log("monthly income", data);

  console.log("XAxis", XAxis);
  return (
    <ComposedChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis
        dataKey={props.dataXName}
        // tick={{ fontSize: 10 }}
      />
      <Legend layout="vetical" verticalAlign="middle" align="right" />
      <Bar
        dataKey={props.dataValue}
        dataValue={props.dataValue}
        barSize={20}
        fill="#8884d8"
      />
      {props.secondaryData ? (
        <Bar
          dataKey={props.secondaryData.dataValue}
          dataValue={props.secondaryData.dataValue}
          barSize={20}
          fill="#82ca9d"
        />
      ) : (
        ""
      )}
      {/* <Line type="monotone" dataKey="customers" stroke="#ff7300" /> */}
    </ComposedChart>
  );
};
export default ColumnGrid;
