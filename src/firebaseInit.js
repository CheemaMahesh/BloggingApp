// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTrZmii7IObwZxWbmCI9TfRwdauN4SmaQ",
  authDomain: "blogging-app-e3676.firebaseapp.com",
  projectId: "blogging-app-e3676",
  storageBucket: "blogging-app-e3676.appspot.com",
  messagingSenderId: "1087811735223",
  appId: "1:1087811735223:web:9c3f1072d7b0f68cd18732"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app);