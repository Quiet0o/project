import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSANGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT_ID
});
  
const db = getFirestore();
const storage = getStorage(firebaseApp);
const auth = getAuth();
const GoogleProvider = new GoogleAuthProvider();

export {db,storage,auth ,GoogleProvider,firebaseApp};

