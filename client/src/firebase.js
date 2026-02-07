// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// TODO: Replace with your project config from Firebase Console -> Project Settings -> General -> Your apps
const firebaseConfig = {
    apiKey: "AIzaSyBO-v77HC8JZI_sgoV3YTHPSpih000KSBo",
    authDomain: "ecommerce-4e23f.firebaseapp.com",
    projectId: "ecommerce-4e23f",
    storageBucket: "ecommerce-4e23f.firebasestorage.app",
    messagingSenderId: "731680837971",
    appId: "1:731680837971:web:6284a9853745926354d1a6",
    measurementId: "G-GG5M52XLDE"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
