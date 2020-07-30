import React from "react";
import "./Header.css";
import { makeStyles } from "@material-ui/core/styles";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import logo from "../../logo_blue.png";
import { Link as RouterLink, BrowserRouter as Router } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AuthButton from "../AuthButton/AuthButton";
import GlobalFirebase from "../../Firebase/FirebaseConfig";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
const Header = ({ loggedIn }) => {
  const classes = useStyles();

  return (
    <header className="App-header d-flex justify-content-between pl-2 pr-2">
      <img src={logo} alt="logo" className="p-2 logo" />
      <h4 className="d-inline-block">DVDash</h4>
      <Typography className={classes.margin}>
        <Link to="/store" component={RouterLink}>
          Store{" "}
        </Link>
        <Link to="/dashboard" component={RouterLink}>
          Dashboard
        </Link>
        {!loggedIn ? (
          <Link
            to="/login"
            component={RouterLink}
            color="secondary"
            size="medium"
            className={`${classes.margin} text-right`}
          >
            <OpenInBrowserIcon className="sign-in-icon" /> Sign-in
          </Link>
        ) : (
          <AuthButton onClickAuth={GlobalFirebase.logOut} text={"Logout"} />
        )}
      </Typography>
    </header>
  );
};

export default Header;
