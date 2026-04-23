import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlFavlr_3Rxy67uDYroT6-OwIV5eqKkFQ",
  authDomain: "cotacao-moedas-firebase-app.firebaseapp.com",
  projectId: "cotacao-moedas-firebase-app",
  storageBucket: "cotacao-moedas-firebase-app.firebasestorage.app",
  messagingSenderId: "183636418150",
  appId: "1:183636418150:web:7faea42c9269e41a20d7a7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);