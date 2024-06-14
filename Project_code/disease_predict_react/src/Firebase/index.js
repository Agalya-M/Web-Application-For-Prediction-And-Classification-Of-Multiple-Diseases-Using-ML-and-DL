// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjqxwbwrn3NOs-la_KZ2fMzVJh1o79Nek",
  authDomain: "disease-prediction-react.firebaseapp.com",
  projectId: "disease-prediction-react",
  storageBucket: "disease-prediction-react.appspot.com",
  messagingSenderId: "970341063332",
  appId: "1:970341063332:web:3da2c8eea78650f97ba431",
  measurementId: "G-WFM85C07JW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const saveDiseaseTestData = async (payload) => {
  try {
    await addDoc(collection(db, "diseaseTests"), payload);
    alert("Process successful");
  } catch (error) {
    alert("Process unsuccessful, Something went wrong");
  }
};
