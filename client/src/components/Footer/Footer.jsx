import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./Footer.css";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#282c34",
    minHeight: "7vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    // marginTop: theme.spacing(0),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={`${classes.footer} footer`}>
      <Box mt={8}>
        <Typography variant="body2">
          {"Copyright © "}
          DVDash
          {new Date().getFullYear()}
        </Typography>
      </Box>
    </div>
  );
};
export default Footer;
