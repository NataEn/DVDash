import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@material-ui/core";

const TopItemsPanel = (props) => {
  const [filter, setFilter] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setFilter("top_actor");
    setTitle("Actors");
  }, []);

  const handelFilterButton = (optionArr) => {
    setFilter(`top_${optionArr[1]}`);
    setTitle(optionArr[0]);
    props.setTopData(props.data[optionArr[1]]);
  };

  return (
    <>
      <h4 className="text-center d-inline">Top 10 {title}</h4>
      <ButtonGroup
        color="primary"
        aria-label="button group"
        size="small"
        className="d-inline"
      >
        <Button onClick={() => handelFilterButton(["Movies", "title"])}>
          Movies
        </Button>
        <Button onClick={() => handelFilterButton(["Actors", "actor"])}>
          Actors
        </Button>
        <Button onClick={() => handelFilterButton(["Janres", "category"])}>
          Janres
        </Button>
      </ButtonGroup>
    </>
  );
};

export default TopItemsPanel;
