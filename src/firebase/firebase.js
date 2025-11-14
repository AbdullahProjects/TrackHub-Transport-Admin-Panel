import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGn4W1UXiszWa9GPYa2GcXyn8f5br1NTs",
  authDomain: "trackhub-6e96e.firebaseapp.com",
  projectId: "trackhub-6e96e",
  storageBucket: "trackhub-6e96e.firebasestorage.app",
  messagingSenderId: "766996217128",
  appId: "1:766996217128:web:e0c693ede080ec6ca8a41d",
  measurementId: "G-JV4SN1L8TE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export {app, db}