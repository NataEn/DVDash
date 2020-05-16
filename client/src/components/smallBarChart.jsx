import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page h",
    uv: 3400,
    pv: 1300,
    amt: 2100,
  },
  {
    name: "Page s",
    uv: 3420,
    pv: 4000,
    amt: 2100,
  },
  {
    name: "Page r",
    uv: 340,
    pv: 400,
    amt: 100,
  },
];

export default function SmallBarChart() {
  const [gridData, setGridData] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (event) => {
    console.log(event.payload);
    const index = gridData.indexOf(event.payload);
    setActiveIndex(index);
  };
  return (
    <>
      <BarChart width={150} height={40} data={data}>
        <Tooltip />
        <Bar dataKey="uv" onClick={handleClick}>
          {gridData.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
      <p className="content">{`Uv of "${gridData[activeIndex].name}": ${gridData[activeIndex].uv}`}</p>
    </>
  );
}
