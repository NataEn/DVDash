import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthButtonGroup from "../../components/AuthButtonGroup/AuthButtonGroup";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Contexts/Auth";
import GlobalFirebase from "../../Firebase/FirebaseConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loggedIn, toggleLoggedIn } = useContext(AuthContext);
  const classes = useStyles();

  const history = useHistory();
  const googleSignIn = async (event) => {
    event.preventDefault();
    console.log("pressed google log in");
    toggleLoggedIn();
    console.log(loggedIn);
    try {
      await GlobalFirebase.logInWithGoogle();
      props.history.replace("/dashboard");
    } catch (err) {
      console.error(err);
    }
    // history.push("/");
    // Firebase.doSignInWithGoogle();
    // const googleProvider = new firebase.auth.GoogleAuthProvider();
    // Auth.setLoggedIn(true);

    // firebase.auth.signInWithPopup(googleProvider).catch((error) => {
    //   console.log({ errorMessage: error.message });
    // });
  };

  // const handleLogin = () => {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .catch((error) => this.setState({ errorMessage: error.message }));
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <AuthButtonGroup />
          <Button type="button" onClick={(event) => googleSignIn(event)}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="logo"
              width={"10%"}
            />
            <span> Join With Google</span>
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              event.preventDefault();
              console.log("form", event);
              props.signinUser({
                password: password,
                email: email,
              });
              history.push("/");
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default SignIn;
