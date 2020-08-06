import React, { useState, useEffect } from "react";
import "./MovieCard.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const MovieCard = ({ title, imgUrl, vote }) => {
  const style = { backgroundImage: `url(${imgUrl})` };
  const [item, setItem] = useState(1);
  useEffect(() => {
    setItem(2);
    console.log("title, imgUrl, vote", title, imgUrl, vote);
  }, []);
  return (
    <div className={"MovieCard_wrapper"} style={style}>
      <section className={"MovieCard_section"}>
        <h6 className={"MovieCard_h6"}>{title}</h6>

        <Button size="small" color="primary">
          Read More
        </Button>
      </section>
    </div>
  );
};
export default MovieCard;
