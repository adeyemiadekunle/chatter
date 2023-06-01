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
  sendPasswordResetEmail
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  getDocs,
  onSnapshot,
  where,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeCvVEWHnIbkNY8oJi88EBr5CRgHfCchU",
  authDomain: "capstonetest2-b0f27.firebaseapp.com",
  projectId: "capstonetest2-b0f27",
  storageBucket: "capstonetest2-b0f27.appspot.com",
  messagingSenderId: "1034118863335",
  appId: "1:1034118863335:web:7b86c484c86c1da1d04542",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  db,
  app,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  where,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  onSnapshot,
  auth,
  provider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
};
