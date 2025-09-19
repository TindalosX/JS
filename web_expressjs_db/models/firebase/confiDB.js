import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //Aquí van los datos del objeto de configuración para la app.
  apiKey: "AIzaSyC5r53l60LOkAYJc4p7mSjOT6u-EpfTASA",
  authDomain: "intro-firebase-7a2b6.firebaseapp.com",
  databaseURL: "https://intro-firebase-7a2b6-default-rtdb.firebaseio.com",
  projectId: "intro-firebase-7a2b6",
  storageBucket: "intro-firebase-7a2b6.firebasestorage.app",
  messagingSenderId: "998302173109",
  appId: "1:998302173109:web:47fa055f141c9d2b83fbfc",
  measurementId: "G-EBWY89BW0X"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
