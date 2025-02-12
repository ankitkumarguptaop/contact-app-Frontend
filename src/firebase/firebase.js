import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "contact-management-app-afb8a.firebaseapp.com",
  projectId: "contact-management-app-afb8a",
  storageBucket: "contact-management-app-afb8a.firebasestorage.app",
  messagingSenderId: "103715957625",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-CZDMV3QSWT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;
