// import firebaseConfig from "./Firebaseconfig";
// import {initializeApp} from "firebase/app"
// import {getAuth} from "firebase/auth"
// import {getFirestore} from "firebase/firestore"
// const firebaseApp=initializeApp(firebaseConfig);
// const auth =getAuth(firebaseApp);
// const db=getFirestore(firebaseApp);
// export {auth,db};

// firebase.js
import firebaseConfig from "./Firebaseconfig";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Create providers for Google and GitHub
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Email & Password Authentication
export const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Google Authentication
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// GitHub Authentication
export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// Sign Out
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
};

// Auth State Observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, db };