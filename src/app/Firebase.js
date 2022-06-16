// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZlZVuSJODJNnAtsH8DQG5TdPoWyjhAh0",
    authDomain: "natupuntos-7434b.firebaseapp.com",
    projectId: "natupuntos-7434b",
    storageBucket: "natupuntos-7434b.appspot.com",
    messagingSenderId: "837914191944",
    appId: "1:837914191944:web:54bc66fe796b8a5123d07d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);