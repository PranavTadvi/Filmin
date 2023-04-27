// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA4Z4vgVDRt8wKVPLTdqhF06fam3ohBUhY",
  authDomain: "filmin-764b8.firebaseapp.com",
  projectId: "filmin-764b8",
  storageBucket: "filmin-764b8.appspot.com",
  messagingSenderId: "917577880461",
  appId: "1:917577880461:web:8c62f0b57dea87b0b623c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export default app;
