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

const SingInComponent = () => {
  const [admins, setAdmins] = useState([]);

  const [registerEmail,setRegisterEmail]=useState("")
  const [registerPassword,setRegisterPassword]=useState("")
  
  const [loginEmail,setLoginEmail]=useState("")
  const [loginPassword,setLoginPassword]=useState("")
  
  const [user,setUser]=useState({})
  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser) 
  })
  let Admin = false;

  const CheckoutAdmin = async () => {
    const adminsCheck = [];
    const querySnapshot = await getDocs(collection(db, "Admins"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      adminsCheck.push({ ...doc.data() });
    
      // console.log(doc.data().AdminEmail);
      // console.log(auth.currentUser.email);
      // if (user.email === doc.data().AdminEmail) {
      //   console.log("success");
      //   Admin = true;
      // } else {
      //   console.log("err");
        
      // }
    });
    adminsCheck.filter(()=>{
      return adminsChec
    })
    setAdmins(adminsCheck);
    console.log(admins);

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
    {Admin ?<p>jestes admin</p>:<p>nie jestes admin</p>}
    </div>
  );
};
export let user
export default SingInComponent;
