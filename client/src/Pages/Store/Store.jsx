import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
const Store = () => {
  return (
    <div>
      <p>Store of DVDash</p>
      <Carousel title={"Most Popular"} movies={[1, 2, 3]} />
    </div>
  );
};
export default Store;
