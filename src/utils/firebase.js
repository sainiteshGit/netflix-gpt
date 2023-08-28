// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACxvcu46F8BgA-0maGGMIrC1aFzfKNLEY",
  authDomain: "netflixgpt-fd0c3.firebaseapp.com",
  projectId: "netflixgpt-fd0c3",
  storageBucket: "netflixgpt-fd0c3.appspot.com",
  messagingSenderId: "691701232362",
  appId: "1:691701232362:web:a105fc86196f17b3d05d93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
