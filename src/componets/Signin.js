import React from 'react'
import firebase from 'firebase/compat/app';
// import auth from './confing/firebase'
import {signInWithPopup} from 'firebase/auth';
import { auth,GoogleProvider } from './confing/firebase-config';
const SingIn= ()=>{
    const SingInWithGoogle =()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
      
      }
  
      const SingInWithFacebook =()=>{
        const provider = new firebase.auth.FacebookAuthProvider();
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
export default SingIn