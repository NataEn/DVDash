import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { AuthContext } from "../../Contexts/Auth";
import "./AuthButton.css";
const AuthButton = ({ onClickAuth, imgUrl, icon, text }) => {
  const history = useHistory();
  const { toggleLoggedIn } = useContext(AuthContext);
  return (
    <Button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        onClickAuth()
          .then((res) => {
            console.log("from firebase button", res);
            if (res.user) {
              //create portfolio
              toggleLoggedIn();
              history.push("/store");
            } else {
              console.log("logging out ...", res);
              toggleLoggedIn();
              history.push("/");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }}
    >
      <IconButton aria-label={`${text}`} color="inherit">
        {imgUrl && <img src={imgUrl} alt="button logo" width={"10%"} />}
        {icon && <i className={icon}></i>}
      </IconButton>
      <span> {text}</span>
    </Button>
  );
};

export default AuthButton;
