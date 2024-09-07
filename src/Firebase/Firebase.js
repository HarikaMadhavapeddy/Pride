// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvOo_j3zUWQmNYPzcSsrxrV5uDY8iflSA",
  authDomain: "e-commerce-93816.firebaseapp.com",
  projectId: "e-commerce-93816",
  storageBucket: "e-commerce-93816.appspot.com",
  databaseURL: "https://e-commerce-93816-default-rtdb.firebaseio.com",
  messagingSenderId: "177283998422",
  appId: "1:177283998422:web:598c1b22c33882d6699f77",
  measurementId: "G-HDYRH9KESN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database=getDatabase(app);