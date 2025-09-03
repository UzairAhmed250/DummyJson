import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, getIdToken } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzFcD8eXPQyFusakSD8L9v_PqUYi4EiM4",
  authDomain: "dummydata-2ad04.firebaseapp.com",
  projectId: "dummydata-2ad04",
  storageBucket: "dummydata-2ad04.firebasestorage.app",
  messagingSenderId: "150136663879",
  appId: "1:150136663879:web:fac51e88b450c88abe2662",
  measurementId: "G-5XJ4DFD4LL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, collection, addDoc, auth, onAuthStateChanged , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, getIdToken  };