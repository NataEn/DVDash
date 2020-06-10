import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import logo from "../components/logo_blue.png";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
const Header = () => {
  const classes = useStyles();

  return (
    <header className="App-header d-flex justify-content-between pl-2 pr-2">
      <img src={logo} alt="logo" className="p-2 logo" />
      <h4 className="d-inline-block">DVDash</h4>
      <Button
        color="secondary"
        size="medium"
        className={`${classes.margin} text-right`}
      >
        <OpenInBrowserIcon className={"sign-in-icon"} /> Sign-in
      </Button>
    </header>
  );
};

export default Header;
