import React, { useState, useEffect } from "react";
import "./Carousel.css";
import ItemsCarousel from "react-items-carousel";
import MovieCard from "../MovieCard/MovieCard";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
const Carousel = ({ title, movies }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  console.log("carousel, movies", movies);

  const changeActiveItem = (activeItemIndex) => {
    setActiveItemIndex(activeItemIndex);
  };

  const [item, setItem] = useState(1);
  useEffect(() => {
    setItem(2);
  }, []);
  return (
    <div className="Carousel_wrapper">
      <h3 className="Carousel_h3">{title}</h3>
      <div className="Carousel_container">
        <ItemsCarousel
          infiniteLoop={false}
          gutter={2}
          activePosition={"center"}
          chevronWidth={20}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={6}
          slidesToScroll={1}
          outsideChevron={false}
          showSlither={true}
          firstAndLastGutter={false}
          activeItemIndex={activeItemIndex}
          requestToChangeActive={(value) => setActiveItemIndex(value)}
          rightChevron={
            <IconButton color="primary">
              <NavigateNextIcon />
            </IconButton>
          }
          leftChevron={
            <IconButton color="primary" className="Carousel_arrow">
              <NavigateBeforeIcon />
            </IconButton>
          }
        >
          {movies.map((movie, i) => (
            <MovieCard
              key={i}
              imgUrl={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
              title={movie.title}
              vote={movie.vote_average}
              style={{ height: 300 }}
            />
          ))}
        </ItemsCarousel>
      </div>
    </div>
  );
};
export default Carousel;
