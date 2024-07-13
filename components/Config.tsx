// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import {getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBfAJ2YxCeBDzkjPeC2uKYOI-Bp-b6qVKw",
  authDomain: "prueba-vz-d7c9c.firebaseapp.com",
  projectId: "prueba-vz-d7c9c",
  storageBucket: "prueba-vz-d7c9c.appspot.com",
  messagingSenderId: "277564284687",
  appId: "1:277564284687:web:a4ae378ea2be6f05cba87a",
  measurementId: "G-P98D0LB0JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);
 export const auth = getAuth(app);

 export const storage = getStorage(app);
 export const db = getDatabase(app);

