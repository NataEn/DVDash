import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthButton from "../AuthButton/AuthButton";
import GlobalFirebase from "../../Firebase/FirebaseConfig";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

const ProfileMenu = ({ isProfileMenuOpen, handleMenuClose, loggedIn }) => {
  const classes = useStyles();
  const [item, setItem] = useState(1);
  useEffect(() => {
    setItem(2);
  }, []);
  return (
    <Menu
      anchorEl={isProfileMenuOpen}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={"primary-search-account-menu"}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isProfileMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton aria-label="show 2 items in cart" color="inherit">
          <AccountCircle />
        </IconButton>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton aria-label="show 2 items in cart" color="inherit">
          <Badge badgeContent={2} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        Cart
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        Messages
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        Notifications
      </MenuItem>
      <MenuItem>
        <AuthButton
          onClickAuth={GlobalFirebase.logOut}
          text={"Logout"}
          icon={"fas fa-sign-out-alt"}
        />
      </MenuItem>
    </Menu>
  );
};
export default ProfileMenu;
