// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxdmpD96V70dhrLr8h3eF7mZBcD7aZXrc",
  authDomain: "chatte-d8832.firebaseapp.com",
  projectId: "chatte-d8832",
  storageBucket: "chatte-d8832.appspot.com",
  messagingSenderId: "190024177389",
  appId: "1:190024177389:web:c65d5178577e58e6c09ee4",
  measurementId: "G-NN4RGX2XQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export {
  db,
  app,
  auth,
  analytics,
  provider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GithubAuthProvider,
  signInWithPopup,
 
};
