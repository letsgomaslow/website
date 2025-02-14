import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyOnyTBPmHAbJu9L2gExwlpL03YAqrUL0",
  authDomain: "maslow-website.firebaseapp.com",
  projectId: "maslow-website",
  storageBucket: "maslow-website.firebasestorage.app",
  messagingSenderId: "258314502456",
  appId: "1:258314502456:web:3dbb774508c70586a681cd",
  measurementId: "G-5EXZLS3MXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);