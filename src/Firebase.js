// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx-xy7L4-v-dA2FuAVCb3Rz9esO4coWU0",
  authDomain: "loancalcall.firebaseapp.com",
  databaseURL:
    "https://loancalcall-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "loancalcall",
  storageBucket: "loancalcall.appspot.com",
  messagingSenderId: "331430517646",
  appId: "1:331430517646:web:a656bf112f7fa1f472a2df",
  measurementId: "G-7B35776LZD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
