import React from 'react'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { FacebookAuthProvider } from "firebase/auth";



firebase.initializeApp({
    apiKey:"AIzaSyBYfecFlYj8-y5N5lt5MstLPTsJ8jO2cWs",
    authDomain: "karina-projec.firebaseapp.com",
    projectId: "karina-projec",
    storageBucket: "karina-projec.appspot.com",
    messagingSenderId: "840056781037",
    appId: "1:840056781037:web:e3b6502ef0891610aaf4e4",
    measurementId: "G-TRDRE1HY9C"
  });
  
  
  const auth = firebase.auth();
  const provider = new firebase.auth.FacebookAuthProvider();


const SignIn=()=>{

    const SingInWithGoogle =()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }

      const SingInWithFacebook =()=>{
        auth.signInWithPopup(provider)
      }

      const SingInWithGithub =()=>{
        const provider = new firebase.auth.GithubAuthProvider();
        auth.signInWithPopup(provider);
      }

      return(
        <div>
          
          <button onClick={SingInWithGoogle}>Sing in with Google account</button>
          <button onClick={SingInWithFacebook}>Sing in with FacebookAuthProvider account</button>
          <button onClick={SingInWithGithub}>Sing in with Github account</button>
        </div>
      )
}

export default SignIn;