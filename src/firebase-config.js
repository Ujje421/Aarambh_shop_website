import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnBGOqS5nGGkX8eDvZh7AtKJ5-vqUo8PY",
  authDomain: "aarambh-boutique-d72ce.firebaseapp.com",
  projectId: "aarambh-boutique-d72ce",
  storageBucket: "aarambh-boutique-d72ce.firebasestorage.app",
  messagingSenderId: "975635407468",
  appId: "1:975635407468:web:a2bbbfe27ba64b8a01ae49",
  measurementId: "G-GK2FPX9JQG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);