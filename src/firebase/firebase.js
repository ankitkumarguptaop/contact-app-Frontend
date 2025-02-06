import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx8j3qXM_lwacYO6IiXZYZlvw2HUopmCo",
  authDomain: "contact-management-app-afb8a.firebaseapp.com",
  projectId: "contact-management-app-afb8a",
  storageBucket: "contact-management-app-afb8a.firebasestorage.app",
  messagingSenderId: "103715957625",
  appId: "1:103715957625:web:60ced406009bbe80f51da8",
  measurementId: "G-CZDMV3QSWT"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const analytics = getAnalytics(app);

export default app;