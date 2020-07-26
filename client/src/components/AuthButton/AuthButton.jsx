import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./AuthButton.css";
const AuthButton = ({ onClickAuth, imgUrl, text }) => {
  return (
    <Button
      type="button"
      onClick={(event) => {
        console.log(event);
        //onClickAuth();
      }}
      //   onClick={onClickAuth}
    >
      <img src={imgUrl} alt="button logo" width={"10%"} />
      &nbsp; &nbsp;
      <span> {text}</span>
    </Button>
  );
};

export default AuthButton;
