import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    //Aca va el objeto que nos da firebase
    apiKey: "AIzaSyATK9SZUVgI2VlpBWPsT0Rnh07llNfM2E4",
    authDomain: "valsaa-react-3175f.firebaseapp.com",
    projectId: "valsaa-react-3175f",
    storageBucket: "valsaa-react-3175f.firebasestorage.app",
    messagingSenderId: "791539975824",
    appId: "1:791539975824:web:a66fa0272e385013907a15"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);