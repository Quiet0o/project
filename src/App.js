import './App.css';
import { useState,useEffect } from 'react';
import app from './firebase'
import firebase from 'firebase/compat/app';

const auth = app.auth();
const SignIn=()=>{

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
const SingOut =()=>{
  
  const logout =()=>{
   return  auth.signOut();
  }

  return(
    <button onClick={logout}>Sing out with Google account</button>
  )
}
function App() {

  const [clickedButton, setclickedButton] = useState(false);
  const [count, setcount] = useState(0);

  useEffect(() => {

    if(count === 10){
      console.log("dupa");
    }

  }, [count])

  return (
    <div className="App">
    
      <h1>Dupa</h1>
      <button onClick={()=>setclickedButton(!clickedButton)} >{clickedButton.toString()}</button>
      <button onClick={()=>setcount(count+1)} >{count}</button> 
      <SignIn/>
      <p>{auth.currentUser.email}</p>
      <img src={auth.currentUser.photoURL}/>
      {/* <Register/>  */}
      <SingOut/>
    </div>
  );
}

export default App;
