// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv8_yWuFGPooKqgOVrfx7o2jsjItZV6ng",
  authDomain: "ai-trip-planner-c1258.firebaseapp.com",
  projectId: "ai-trip-planner-c1258",
  storageBucket: "ai-trip-planner-c1258.appspot.com",
  messagingSenderId: "25957122838",
  appId: "1:25957122838:web:588f9573eb54d925c3c637",
  measurementId: "G-QBK8YJCVRP"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);