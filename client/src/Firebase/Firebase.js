const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class Fire {
  constructor() {
    const FireBaseKeys = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID,
    };
    if (!firebase.apps.length) {
      console.log(FireBaseKeys);
      firebase.initializeApp(FireBaseKeys);
    }
    const googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  add = ({ text, localUri }) => {
    var db = firebase.firestore();

    db.collection("users")
      .add({
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    db.collection("users")
      .add({
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  addPost = async ({ text, localUri }) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);
    console.log(remoteUri);
    return new Promise((res, rej) => {
      var db = firebase.firestore().collection("posts");
      db.add({
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        image: remoteUri,
      })
        .then((ref) => {
          console.log("YaY");
          res(ref);
        })
        .catch((error) => {
          console.log("OMG");
          rej(error);
        });
    });
  };

  uploadPhotoAsync = async (uri) => {
    const path = `photos/${this.uid}/${this.timestamp}.jpg`;
    console.log(path);

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          console.log("fail");
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
