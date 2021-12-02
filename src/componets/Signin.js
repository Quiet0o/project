import React from 'react'
import {signInWithPopup,GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider} from 'firebase/auth';
import { auth } from './confing/firebase-config';
const SingIn= ()=>{
    const SingInWithGoogle =()=>{
      // const provider =
        signInWithPopup(auth , new GoogleAuthProvider());
    
      }
  
      const SingInWithFacebook =()=>{
        const provider = new FacebookAuthProvider();
        provider.setCustomParameters({
          'display':'popup'
        })
        signInWithPopup(auth , provider).then((result)=>{
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
          console.log(accessToken);
        }).catch(()=>{

        });

      }
  
      const SingInWithGithub =()=>{
        signInWithPopup(auth , new GithubAuthProvider());

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