// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.REACT_APP_API_KEY,
//   authDomain: import.meta.env.REACT_APP_AUTH_DOMAIN,
//   projectId: import.meta.env.REACT_APP_PROJECT_ID,
//   storageBucket: import.meta.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: import.meta.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAMMvY3F88TdmADHlZ5PXwznd0oVhgS_OE",
  authDomain: "react-auth-app-82f7b.firebaseapp.com",
  projectId: "react-auth-app-82f7b",
  storageBucket: "react-auth-app-82f7b.appspot.com",
  messagingSenderId: "262234792122",
  appId: "1:262234792122:web:7dd981283ae32d55b1e283",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
