import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@material-ui/core";

const TopItemsPanel = (props) => {
  const filter = props.filter;
  const title = props.title;
  const setFilter = props.setTopItemsFilter;
  useEffect(() => {
    setFilter("actor");
  }, []);

  const handelFilterButton = (option) => {
    setFilter(option);
  };

  return (
    <>
      <h4 className="text-center d-inline">Top {title}</h4>
      <ButtonGroup
        color="primary"
        aria-label="button group"
        size="small"
        className="d-inline"
      >
        <Button onClick={() => handelFilterButton("title")}>Movies</Button>
        <Button onClick={() => handelFilterButton("actor")}>Actors</Button>
        <Button onClick={() => handelFilterButton("category")}>Janres</Button>
      </ButtonGroup>
    </>
  );
};

export default TopItemsPanel;
