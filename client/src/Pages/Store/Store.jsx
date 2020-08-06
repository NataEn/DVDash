import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
const Store = ({ trendingMovies, newMovies }) => {
  console.log("store trending Movies ", trendingMovies.length);
  return (
    <div>
      <p>Store of DVDash</p>
      {trendingMovies.length && (
        <Carousel title={"Most Popular"} movies={trendingMovies} />
      )}
      {newMovies.length && (
        <Carousel title={"New on the Shelf"} movies={newMovies} />
      )}
      <Carousel title={"Most Popular"} movies={[1, 2, 3]} />
    </div>
  );
};
export default Store;
