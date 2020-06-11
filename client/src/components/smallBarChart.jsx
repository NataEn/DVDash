import React, { useEffect, useState } from "react";
import { BarChart, Bar, Cell, CartesianGrid } from "recharts";

export default function SmallBarChart(props) {
  console.log("data ", props.data);
  const [gridData, setGridData] = useState(props.data);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (event) => {
    // console.log(event.payload);
    const index = gridData.indexOf(event.payload);
    setActiveIndex(index);
  };
  return (
    <>
      {!!gridData ? (
        <>
          <BarChart width={90} height={50} data={gridData}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Bar
              dataKey="value"
              barSize={10}
              onClick={handleClick}
              background={{ fill: "#eee" }}
            >
              {gridData.map((entry, index) => (
                <Cell
                  cursor="pointer"
                  fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
                  // background={{ fill: "#eee" }}
                  key={`cell-${index}`}
                />
              ))}
            </Bar>
          </BarChart>
          <p className="content">{`${gridData[activeIndex].name}: ${gridData[activeIndex].value}`}</p>
        </>
      ) : (
        <div>no data available</div>
      )}
    </>
  );
}
