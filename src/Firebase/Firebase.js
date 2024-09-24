// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /*apiKey: process.env.PRIDE_API_KEY,
  authDomain: process.env.PRIDE_AUTH_DOMAIN,
  projectId: process.env.PRIDE_PROJECT_ID,
  storageBucket: process.env.PRIDE_STORAGE_BUCKET,
  databaseURL: process.env.PRIDE_DATABASE_URL,
  messagingSenderId: process.env.PRIDE_MESSAGE_SENDER,
  appId: process.env.PRIDE_APP_ID,
  measurementId: process.env.PRIDE_MEASUREMENT_ID*/
  apiKey: "AIzaSyDvOo_j3zUWQmNYPzcSsrxrV5uDY8iflSA",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
console.log('harika');
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database=getDatabase(app);