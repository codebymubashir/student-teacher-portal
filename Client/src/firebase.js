// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLbIeuS79CgP0NBfNENN943bRzamC2trQ",
  authDomain: "student-portal-fe890.firebaseapp.com",
  projectId: "student-portal-fe890",
  storageBucket: "student-portal-fe890.firebasestorage.app",
  messagingSenderId: "729050482060",
  appId: "1:729050482060:web:4b38046ba2c70d2108c2a9",
  measurementId: "G-QXXHS76SXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)