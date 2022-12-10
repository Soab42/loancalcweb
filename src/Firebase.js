// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
