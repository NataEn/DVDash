import * as firebase from "firebase";
import app from "firebase/app";
import "firebase/auth";

export const firebaseConfig = {
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
    app.initializeApp();
    this.auth = app.auth();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }
  doCreateUserWithEmailAndPassword = (email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password);
  };
  doSignInWithEmailAndPassword = (email, password) => {
    this.auth.signInWithEmailAndPassword(email, password);
  };
  doSignOut = () => this.auth.signOut();
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
  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider).catch((error) => {
      console.log({ errorMessage: error.message });
    });
}
// const GlobalFirebase = new Firebase();

// export default GlobalFirebase;
