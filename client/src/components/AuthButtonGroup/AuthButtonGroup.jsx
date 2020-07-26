import React, { Component } from "react";
import AuthButton from "../AuthButton/AuthButton";
import "./AuthButtonGroup.css";

const AuthButtonGroup = () => {
  const typeList = [
    {
      type: "google",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      text: "Login with google",
    },
    {
      type: "facebook",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      text: "Login with facebook",
    },
    {
      type: "twitter",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/9/9f/Twitter_bird_logo_2012.svg",
      text: "Login with twitter",
    },
    {
      type: "github",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/95/Font_Awesome_5_brands_github.svg",
      text: "Login with github",
    },
  ];

  return (
    <ul>
      {typeList.map((buttonType) => (
        <AuthButton
          type={buttonType.type}
          imgUrl={buttonType.imgUrl}
          text={buttonType.text}
        />
      ))}
    </ul>
  );
};

export default AuthButtonGroup;
