import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 590,
  },
  {
    name: "Page B",
    uv: 868,
  },
  {
    name: "Page C",
    uv: 1397,
  },
  {
    name: "Page D",
    uv: 1480,
  },
  {
    name: "Page E",
    uv: 1520,
  },
  {
    name: "Page F",
    uv: 1400,
  },
];
const maxValue = Math.max(...data.map((item) => item.uv));

export const VerticalChart = (props) => {
  const countryName = (payload) => payload;

  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart
        layout="vertical"
        width="100%"
        height="80%"
        data={data}
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
      >
        <XAxis type="number" tickLine={false} ticks={[0, 1600]} />
        <YAxis
          dataKey="name"
          type="category"
          tickFormatter={countryName}
          tickLine={false}
          axisLine={false}
          // tickMargin={{ top: 0, bottom: 0 }}
        />
        <Bar dataKey="uv" barSize={15} fill="#413ea0" />
      </BarChart>
    </ResponsiveContainer>
  );
};
