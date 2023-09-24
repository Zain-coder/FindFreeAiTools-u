import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCEoBusPjCNV2pLfS_spSbLZinVbgdJkr8",
  authDomain: "findfreeaitools-4e047.firebaseapp.com",
  projectId: "findfreeaitools-4e047",
  storageBucket: "findfreeaitools-4e047.appspot.com",
  messagingSenderId: "889385229402",
  appId: "1:889385229402:web:776ab4caebae7cc9398c63",
  measurementId: "G-DLH0ZQS4F8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage
const storage = getStorage(app);

// Initialize Cloud Functions
const functions = getFunctions();

// Auth
const auth = getAuth(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

export {
  app,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  query,
  where,
  orderBy,
  onAuthStateChanged,
  getDoc,
  createUserWithEmailAndPassword,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  httpsCallable,
  functions,
  auth,
  provider,
  signInWithPopup,
};
