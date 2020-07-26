import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./AuthButton.css";
const AuthButton = ({ type, imgUrl, text }) => {
  return (
    <Button
      type="button"
      onClick={(event) => {
        console.log(event);
      }}
    >
      <img src={imgUrl} alt="logo" width={"10%"} />
      <span> {text}</span>
    </Button>
  );
};

export default AuthButton;
