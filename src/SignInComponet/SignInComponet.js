import React, { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../componets/confing/firebase-config";
import { collection, getDocs, Timestamp } from "firebase/firestore";

const SingInComponent = () => {
  const [admins, setAdmins] = useState([]);
  let user =null;
  const CheckoutAdmin = async () => {
    const ass = [];
    const querySnapshot = await getDocs(collection(db, "Admins"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      ass.push({ ...doc.data() });
      console.log(doc.data().AdminEmail);
      console.log(auth.currentUser.email);
      if (auth.currentUser.email == doc.data().AdminEmail) {
        console.log("success");
      } else {
        console.log("err");
        
      }
    });
    setAdmins(ass);
    console.log(admins);
    user= auth.currentUser

  };
  const SingInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        CheckoutAdmin();
        console.log(user)
      })
      .catch(err => {
        alert(err.message)
      });
  };

  const SingInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({
      display: "popup",
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // console.log(accessToken);
        CheckoutAdmin();
      })
      .catch(err => {
        alert(err.message)
      });;
  };

  const SingInWithGithub = () => {
    signInWithPopup(auth, new GithubAuthProvider())
      .then(() => {
        CheckoutAdmin();
      })
      .catch(() => {
        console.log("account with this email exsits");
      });
  };

  return (
    <div className="ssds">
      {user?<p>dasda</p>:<div>
      <button onClick={SingInWithGoogle}>Sing in with Google account</button>
      <button onClick={SingInWithFacebook}>
        Sing in with FacebookAuthProvider account
      </button>
      <button onClick={SingInWithGithub}>Sing in with Github account</button>
    </div>}
    </div>
    
  );
};
export let user
export default SingInComponent;
