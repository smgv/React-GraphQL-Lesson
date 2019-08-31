import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDH1BfyE81RJt-1-BEd8yrq8zHS_-A8XU0",
  authDomain: "ecommerce-react-db.firebaseapp.com",
  databaseURL: "https://ecommerce-react-db.firebaseio.com",
  projectId: "ecommerce-react-db",
  storageBucket: "ecommerce-react-db.appspot.com",
  messagingSenderId: "52491304274",
  appId: "1:52491304274:web:8d0b21aa14da543d",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
