import React from "react";
import {
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

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
const maxValue = Math.ceil(Math.max(...data.map((item) => item.uv)));

export const VerticalChart = (props) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
          ticks={[0]}
          tickLine={false}
          axisLine={false}
        />
        <Bar dataKey="uv" fill="#8884d8" barSize={20}>
          <LabelList
            dataKey="uv"
            position="insideRight"
            fontSize="0.7rem"
            fontWeight="600"
          />
          <LabelList
            dataKey="name"
            position="insideLeft"
            fontSize="0.7rem"
            fontWeight="600"
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
