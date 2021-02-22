import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  block: {
    display: "block",
  },
}));

const HeaderMenu = ({ handleProfileMenuOpen }) => {
  const classes = useStyles();

  return (
    <>
      <MenuItem>
        <Link
          to="/store"
          component={RouterLink}
          className={(classes.margin, classes.block)}
          aria-label="link to DVDash store"
        >
          Store
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to="/dashboard"
          component={RouterLink}
          className={(classes.margin, classes.block)}
          aria-label="link to DVDash dashboard"
        >
          Dashboard
        </Link>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls={"primary-search-account-menu"}
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        Profile
      </MenuItem>
    </>
  );
};
export default HeaderMenu;
