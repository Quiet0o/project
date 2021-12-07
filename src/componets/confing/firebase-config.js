import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBYfecFlYj8-y5N5lt5MstLPTsJ8jO2cWs",
  authDomain: "karina-projec.firebaseapp.com",
  databaseURL: "https://karina-projec-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "karina-projec",
  storageBucket: "karina-projec.appspot.com",
  messagingSenderId: "840056781037",
  appId: "1:840056781037:web:e3b6502ef0891610aaf4e4",
  measurementId: "G-TRDRE1HY9C"
});
  
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

export {db,storage,auth ,firebaseApp};

