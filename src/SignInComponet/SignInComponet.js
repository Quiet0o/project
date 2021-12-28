import React, { useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "../componets/confing/firebase-config";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import AdminPage from "../componets/AdminPage/AdminPage";

const SingInComponent = () => {
  const [admins, setAdmins] = useState([]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const CheckoutAdmin = async () => {
    const adminsCheck = [];
    let BreakException = {};
    const querySnapshot = await getDocs(collection(db, "Admins"));
    try {
      querySnapshot.forEach((doc) => {
        adminsCheck.push({ ...doc.data() });

        if (user?.email === doc.data().AdminEmail) {
          throw BreakException;
        }
        return true;
      });
      setAdmins(adminsCheck);
      console.log(admins);
    } catch (err) {
      if (err !== BreakException) {
        throw err;
      }
    }
  };

  const Login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      CheckoutAdmin();
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "auth/user-not-found":
          alert("user not found!");
          break;
        case "auth/email-already-exists":
          alert(" email is already in use by an existing user!");
          break;
        case "auth/invalid-email":
          alert("email user property is invalid. It must be a string email address!");
          break;
          case "auth/invalid-password":
            alert("The provided value for the password user property is invalid!");
            break;
            case "auth/wrong-password":
              alert("The provided value for the password user property is invalid2!");
              break;
          case "auth/too-many-requests":
                alert("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later!");
                break;
      }
      console.log(err.message);
    }
  };
  return (
    <div className="ssds">
      {user ? (
        <></>
      ) : (
        <div className="dupa">
          <h1>Login in </h1>

          <input
            type="email"
            placeholder="email..."
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="email..."
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
          <br />
          <button
            placeholder="wyslij"
            value="dupa"
            onClick={() => {
              Login();
            }}
          >
            Login{" "}
          </button>
          <br />
          <br />
        </div>
      )}
      {user ? <AdminPage /> : <p></p>}
    </div>
  );
};
export let user;
export default SingInComponent;
