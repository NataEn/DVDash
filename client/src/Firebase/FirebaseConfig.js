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
console.log("key", process.env.REACT_APP_FIREBASE_API_KEY, process.env);
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
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

  logOut = async () => {
    await this.auth.signOut();
    console.log("logout", this.auth.currentUser);
    return this.auth.currentUser;
  };
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // doGoogleSignIn = () => {
  //
  //   this.auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       const token = result.credential.accessToken;
  //       const user = result.user;
  //     })
  //     .catch((error) => console.error(error));
  // };
  logInWithGoogle = async () => {
    await this.auth.signInWithPopup(this.googleProvider).catch((error) => {
      console.log({ errorMessage: error.message });
    });
    console.log("api key", process.env.REACT_APP_FIREBASE_API_KEY);
    console.log("google create user", this.auth.currentUser);
    return this.auth.currentUser;
  };
}
const GlobalFirebase = new Firebase();

export default GlobalFirebase;
