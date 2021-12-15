import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../componets/confing/firebase-config";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import AdminPage from "../componets/AdminPage/AdminPage";

const SingInComponent = () => {
  const [admins, setAdmins] = useState([]);

  const [registerEmail,setRegisterEmail]=useState("")
  const [registerPassword,setRegisterPassword]=useState("")
  
  const [loginEmail,setLoginEmail]=useState("")
  const [loginPassword,setLoginPassword]=useState("")

  const [adminLog,setAdminLog]=useState(false)
  
  const [user,setUser]=useState({})
  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser) 
  })

  const CheckoutAdmin = async () => {
    const adminsCheck = [];
    let BreakException = {};
    const querySnapshot = await getDocs(collection(db, "Admins"));
    try{

      querySnapshot.forEach((doc) => {
      adminsCheck.push({ ...doc.data() });

      if (user?.email === doc.data().AdminEmail) {
        setAdminLog(!adminLog)
        throw BreakException
      }
      return true;
    });
      setAdmins(adminsCheck);
      console.log(admins);
    }
    catch(err){
      if (err!==BreakException) {
        throw err
      }
    }

  };
  const Register= async ()=>{
    try{
      const user=   await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
      console.log(user);
    }
    catch(err){
      console.log(err.message);
    }
  }
  const Login= async ()=>{
    console.log(adminLog)
    try{
      const user=   await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
      console.log(user);
      CheckoutAdmin()
    }
    catch(err){
      console.log(err.message);
    }
  }
  const LogOut= async ()=>{
    setAdminLog(!adminLog)
    await signOut(auth)
  }
  // const SingInWithGoogle = () => {
  //   signInWithPopup(auth, new GoogleAuthProvider())
  //     .then(() => {
  //       CheckoutAdmin();
  //       console.log(user)
  //     })
  //     .catch(err => {
  //       alert(err.message)
  //     });
  // };

  // const SingInWithFacebook = () => {
  //   const provider = new FacebookAuthProvider();
  //   provider.setCustomParameters({
  //     display: "popup",
  //   });
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const credential = FacebookAuthProvider.credentialFromResult(result);
  //       const accessToken = credential.accessToken;
  //       // console.log(accessToken);
  //       CheckoutAdmin();
  //     })
  //     .catch(err => {
  //       alert(err.message)
  //     });;
  // };

  // const SingInWithGithub = () => {
  //   signInWithPopup(auth, new GithubAuthProvider())
  //     .then(() => {
  //       CheckoutAdmin();
  //     })
  //     .catch(() => {
  //       console.log("account with this email exsits");
  //     });
  // };

  return (
    <div className="ssds">
      {/* {user?<p>dasda</p>:<div>
      <button onClick={SingInWithGoogle}>Sing in with Google account</button>
      <button onClick={SingInWithFacebook}>
        Sing in with FacebookAuthProvider account
      </button>
      <button onClick={SingInWithGithub}>Sing in with Github account</button>
    </div>} */}
    <h1>Sign in</h1>
   
      <input type="email" placeholder="email..." onChange={(e)=>{setRegisterEmail(e.target.value)}}/><br/>
      <input type="text" placeholder="email..."onChange={(e)=>{setRegisterPassword(e.target.value)}}/><br/>
      <button placeholder="wyslij" value="dupa" onClick={()=>{Register()}}>Register</button>

    <h1>Login in  </h1>
    
      <input type="email" placeholder="email..." onChange={(e)=>{setLoginEmail(e.target.value)}}/><br/>
      <input type="text" placeholder="email..."onChange={(e)=>{setLoginPassword(e.target.value)}}/><br/>
      <button placeholder="wyslij" value="dupa" onClick={()=>{Login()}}>Login </button>
    <br/>
    <br/>
    <button onClick={()=>{LogOut()}}>Sign out</button>
    <p>{user?.email}</p>
    {adminLog?<AdminPage/>:<p>nie jestes admin</p>}
    </div>
  );
};
export let user
export default SingInComponent;
