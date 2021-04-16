import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyB0u3NOkQN0o9vGNioZdmh6QeavSH4SFdo",
	authDomain: "react-apps-udemy.firebaseapp.com",
	projectId: "react-apps-udemy",
	storageBucket: "react-apps-udemy.appspot.com",
	messagingSenderId: "3125319386",
	appId: "1:3125319386:web:ea74814e072bb5ee0b77e3",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
