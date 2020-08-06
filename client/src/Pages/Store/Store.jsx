import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Filter from "../../components/Filter/Filter";
const Store = ({
  trendingMovies,
  newMovies,
  trendingByGenres,
  selectGenre,
  genres,
  genre,
}) => {
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
      {trendingByGenres && (
        <Carousel
          title={`Most Popular ${genre} Movies`}
          movies={trendingByGenres}
          filter={
            genres.length && (
              <Filter
                options={genres}
                helperText={"Select genre"}
                onSelect={selectGenre}
                type="genre"
              />
            )
          }
        />
      )}
    </div>
  );
};
export default Store;
