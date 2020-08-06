import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
const Store = ({ trending }) => {
  console.log("store trending ", trending.length);
  return (
    <div>
      <p>Store of DVDash</p>
      {trending.length && (
        <Carousel title={"Trending this Week"} movies={trending} />
      )}
      <Carousel title={"Most Popular"} movies={[1, 2, 3]} />
      <Carousel title={"Most Popular"} movies={[1, 2, 3]} />
    </div>
  );
};
export default Store;
