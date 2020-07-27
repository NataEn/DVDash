import * as firebase from "firebase";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

export const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID,
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.twitterProvider = new firebase.auth.TwitterAuthProvider();
    this.gitHubProvider = new firebase.auth.GithubAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
  }

  //this returns a promise:
  createUser = async (name, email, password) => {
    await this.auth.createUserWithEmailAndPassword(name, email, password);
    console.log("create user", this.auth.currentUser);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  };

  login = async (email, password) => {
    await this.auth.signInWithEmailAndPassword(email, password);
    console.log("login", this.auth.currentUser);
    return this.auth.currentUser;
  };

  logOut = async () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
  logInWithGoogle = () => {
    return this.auth.signInWithPopup(this.googleProvider);
    //       const token = result.credential.accessToken;
    // const email = this.auth.currentUser.email;
    // const displayName = this.auth.currentUser.displayName;
    // const phoneNumber = this.auth.currentUser.phoneNumber;
    // const refreshToken = this.auth.currentUser.refreshToken;
    // const photoURL = this.auth.currentUser.photoURL;
    // console.log("got google user");
    // return this.auth.currentUser;
  };
  logInWithGitHub = async () => {
    return this.auth.signInWithPopup(this.gitHubProvider);

    //       const token = result.credential.accessToken;
    // const email = this.auth.currentUser.email;
    // const displayName = this.auth.currentUser.displayName;
    // const phoneNumber = this.auth.currentUser.phoneNumber;
    // const refreshToken = this.auth.currentUser.refreshToken;
    // const photoURL = this.auth.currentUser.photoURL;
    // console.log("got google user");
    // return this.auth.currentUser;
  };
  logInWithFacebook = async () => {
    return this.auth.signInWithPopup(this.facebookProvider);
    //       const token = result.credential.accessToken;
    // const email = this.auth.currentUser.email;
    // const displayName = this.auth.currentUser.displayName;
    // const phoneNumber = this.auth.currentUser.phoneNumber;
    // const refreshToken = this.auth.currentUser.refreshToken;
    // const photoURL = this.auth.currentUser.photoURL;
    // console.log("got google user");
    // return this.auth.currentUser;
  };
  logInWithTwitter = async () => {
    return this.auth.signInWithPopup(this.twitterProvider);
    //       const token = result.credential.accessToken;
    //   const email = this.auth.currentUser.email;
    //   const displayName = this.auth.currentUser.displayName;
    //   const phoneNumber = this.auth.currentUser.phoneNumber;
    //   const refreshToken = this.auth.currentUser.refreshToken;
    //   const photoURL = this.auth.currentUser.photoURL;
    //   console.log("got google user");
    //   return this.auth.currentUser;
  };
}
const GlobalFirebase = new Firebase();

export default GlobalFirebase;
