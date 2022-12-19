import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDPCbDdOxL-isye9fVyAXtMGcZqUYOMWA",
  authDomain: "react-course-b2c0e.firebaseapp.com",
  projectId: "react-course-b2c0e",
  storageBucket: "react-course-b2c0e.appspot.com",
  messagingSenderId: "624697145798",
  appId: "1:624697145798:web:39578bcd588efee538dac7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
