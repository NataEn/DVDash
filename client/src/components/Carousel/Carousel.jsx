import React, { useState, useEffect } from "react";
import "./Carousel.css";
import ItemsCarousel from "react-items-carousel";
import MovieCard from "../MovieCard/MovieCard";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
const Carousel = ({ title, movies, filter }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [windowWidthHeight, setWindowWidthHeight] = useState([]);
  const [cards, setCards] = useState(7);

  const updateWindowDimensios = () => {
    setWindowWidthHeight([window.innerWidth, window.innerHeight]);
  };
  useEffect(() => {
    updateWindowDimensios();
    window.addEventListener("resize", updateWindowDimensios);
    return () => window.removeEventListener("resize", updateWindowDimensios);
  }, []);

  useEffect(() => {
    console.log("window width, height", windowWidthHeight);
    if (windowWidthHeight[0] <= 360) {
      setCards(1);
    } else if (windowWidthHeight[0] <= 550) {
      setCards(2);
    } else if (windowWidthHeight[0] <= 700) {
      setCards(3);
    } else if (windowWidthHeight[0] <= 850) {
      setCards(4);
    } else if (windowWidthHeight[0] <= 1050) {
      setCards(5);
    } else if (windowWidthHeight[0] <= 1250) {
      setCards(6);
    } else if (windowWidthHeight[0] >= 1250) {
      setCards(7);
    }
  }, [windowWidthHeight]);
  const changeActiveItem = (activeItemIndex) => {
    setActiveItemIndex(activeItemIndex);
  };

  const [item, setItem] = useState(1);
  useEffect(() => {
    setItem(2);
  }, []);
  return (
    <div className="Carousel_wrapper">
      <div className="Carousel_title">
        <h3 className="Carousel_h3">{title}</h3>{" "}
        <div className="Carousel_filter">{filter}</div>
      </div>

      <div className="Carousel_container">
        <ItemsCarousel
          infiniteLoop={false}
          gutter={2}
          activePosition={"center"}
          chevronWidth={20}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={cards}
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
            <IconButton
              color="primary"
              className="Carousel_arrow"
              size="medium"
            >
              <NavigateBeforeIcon />
            </IconButton>
          }
        >
          {movies.map((movie, i) => (
            <MovieCard
              key={i}
              imgUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
