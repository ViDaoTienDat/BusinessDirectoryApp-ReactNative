// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx340jakaJHOEZzLa63qPUs-V6JM8L6-o",
  authDomain: "react-native-edfe7.firebaseapp.com",
  projectId: "react-native-edfe7",
  storageBucket: "react-native-edfe7.appspot.com",
  messagingSenderId: "146741182608",
  appId: "1:146741182608:web:040c8040b3b11a6b519815"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const storage = getStorage(app)
