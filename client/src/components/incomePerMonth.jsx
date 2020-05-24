import React, { Component } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    incom: 590,
    customers: 800,
  },
  {
    name: "Feb",
    incom: 868,
    customers: 967,
  },
  {
    name: "March",
    incom: 1397,
    customers: 1098,
  },
  {
    name: "Apr",
    incom: 1480,
    customers: 1200,
  },
  {
    name: "May",
    incom: 1520,
    customers: 1108,
  },
  {
    name: "Jun",
    incom: 1400,
    customers: 680,
  },
  {
    name: "Jul",
    incom: 100,
    customers: 60,
    amt: 1700,
  },
  {
    name: "Aug",
    incom: 800,
    customers: 205,
    amt: 1700,
  },
];

const IncomPerMonth = (props) => {
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
      <XAxis dataKey="name" />
      <Legend />
      <Bar dataKey="incom" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="customers" stroke="#ff7300" />
    </ComposedChart>
  );
};
export default IncomPerMonth;
