import React, { useState, useEffect, useRef } from "react";
import Fade from "@material-ui/core/Fade";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "98%",
    margin: "0 auto",
    height: "120px",
  },
  wrapper: {
    display: "block",
    width: "100%",
    height: "100px",
    backgroundColor: "yellow",
    overflow: "hidden",
  },
  buttonWrapperNext: {
    position: "absolute",
    zIndex: 10,
    top: "50%",
    transform: "translateY(-50%)",
    width: "max-content",
    height: "max-content",
    right: "1rem",
  },
  buttonWrapperPrev: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "max-content",
    height: "max-content",
    zIndex: 10,
    left: "1rem",
  },
  item: {
    display: "inline-block",
    width: "300px",
    height: "80%",
    backgroundColor: "orange",
    margin: "0.5rem",
  },
  slide_indicator: {
    borderRadius: "50%",
    width: "0.7rem",
    height: "0.7rem",
    backgroundColor: "rgba(0,0,0,.3)",
    opacity: "0.5",
    margin: "0.2rem",
    cursor: "pointer",
  },
  slide_indicator_current: { backgroundColor: "rgba(0,0,0,.75)" },
  slide_indicator_wrapper: {
    display: "flex",
    width: "100%",
    listStyle: "none",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const items = [
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
  { name: "5" },
  { name: "6" },
  { name: "7" },
];

const useResize = (myRef) => {
  const [width, setWidth] = useState(
    myRef.current ? myRef.current.offsetWidth : 0
  );
  const [height, setHeight] = useState(
    myRef.current ? myRef.current.offsetWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(myRef.current.offsetWidth);
      setHeight(myRef.current.offsetHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef.current]);

  return { width, height };
};

export default function SimpleSlide() {
  const classes = useStyles();
  const carouselRef = useRef(null);
  const { width, height } = useResize(carouselRef);
  const [direction, setDirection] = useState("");
  const [startSlide, setStartslide] = useState(0);
  const numberOfItems = width !== 0 ? Math.round(width / 300) : 4;
  const currentSlides = items.slice(startSlide, startSlide + numberOfItems);
  const getNextSlide = () => {
    if (
      (startSlide + 1 <= items.length) &
      (items.length - (startSlide + 1) >= numberOfItems)
    ) {
      setStartslide(startSlide + 1);
    }
  };
  const getPrevSlide = () => {
    if (startSlide - 1 >= 0) {
      setStartslide(startSlide - 1);
    }
  };

  return (
    <div className={classes.root}>
      <span className={classes.buttonWrapperPrev}>
        <IconButton
          onClick={() => {
            setDirection("right");
            getPrevSlide();
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </span>
      <div className={classes.wrapper} ref={carouselRef}>
        {currentSlides.map((item) => (
          <Fade in={true}>
            <p className={classes.item}>
              {item.name} width: {width}px number of items{numberOfItems}
            </p>
          </Fade>
        ))}
      </div>
      <span className={classes.buttonWrapperNext}>
        <IconButton
          onClick={() => {
            setDirection("left");
            getNextSlide();
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </span>
      <ul className={classes.slide_indicator_wrapper}>
        <li className={classes.slide_indicator}></li>
        <li className={classes.slide_indicator}></li>
        <li className={classes.slide_indicator}></li>
        <li className={classes.slide_indicator}></li>
        <li className={classes.slide_indicator}></li>
      </ul>
    </div>
  );
}
