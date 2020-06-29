import React from "react";
import "./Header.css";
import { makeStyles } from "@material-ui/core/styles";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import logo from "../../components/logo_blue.png";
import { Link as RouterLink, BrowserRouter as Router } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

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
      <Typography className={classes.margin}>
        <Link to="/" component={RouterLink}>
          Dashboard
        </Link>
        <Link
          to="/login"
          component={RouterLink}
          color="secondary"
          size="medium"
          className={`${classes.margin} text-right`}
        >
          <OpenInBrowserIcon className="sign-in-icon" /> Sign-in
        </Link>
      </Typography>
    </header>
  );
};

export default Header;
