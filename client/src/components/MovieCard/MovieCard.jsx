import React, { useState, useEffect } from "react";
import "./MovieCard.css";
import MovieRating from "../MovieRating/MovieRating";
import Button from "@material-ui/core/Button";

const MovieCard = ({ title, imgUrl, vote }) => {
  const style = { backgroundImage: `url(${imgUrl})` };
  const [item, setItem] = useState(1);
  useEffect(() => {
    setItem(2);
    console.log("title, imgUrl, vote", title, imgUrl, vote);
  }, []);
  return (
    <div className={"MovieCard_wrapper"} style={style}>
      <div className={"MovieCard_dark_background"}></div>
      <section className={"MovieCard_section"}>
        <h6 className={"MovieCard_h6"}>{title}</h6>
        <MovieRating rating={vote} />
        <Button size="small" color="primary">
          Read More
        </Button>
      </section>
    </div>
  );
};
export default MovieCard;
