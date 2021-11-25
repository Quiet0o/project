import React from 'react'
import firebase from 'firebase/compat/app';
import auth from '../firebase'
const SingIn= ()=>{
    const SingInWithGoogle =()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
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