import React, { useState, useEffect } from "react";
import "./Carousel.css";
import ItemsCarousel from "react-items-carousel";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
const Carousel = ({ title, movies }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

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
      <div
        style={{ padding: 0, maxWidth: "90%", margin: "0", margin: "0 auto" }}
        className="Carousel_container"
      >
        <ItemsCarousel
          infiniteLoop={false}
          gutter={12}
          activePosition={"center"}
          chevronWidth={60}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={5}
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
          {Array.from(new Array(10)).map((_, i) => (
            <div
              key={i}
              style={{
                height: 200,
                background: "url(https://placeimg.com/380/200/nature)",
              }}
            />
          ))}
        </ItemsCarousel>
      </div>
    </div>
  );
};
export default Carousel;
