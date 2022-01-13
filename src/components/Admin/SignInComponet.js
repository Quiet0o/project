import React, { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import AdminPage from "./AdminPage";
import { Button } from "react-bootstrap";

const SingInComponent = () => {
  const [admin, setAdmin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError] = useState("");

  const CheckoutAdmin = async () => {
    const adminsCheck = [];
    const querySnapshot = await getDocs(collection(db, "Admins"));
    console.log(auth.currentUser);
    // try {
    querySnapshot.forEach((doc) => {
      adminsCheck.push({ ...doc.data() });
      console.log(doc.data().AdminEmail);
      console.log(auth.currentUser.email);
      if (auth.currentUser.email !== doc.data().AdminEmail) {
        setError("You are not admin on this page");
      } else {
        setAdmin(!admin);
      }
      return true;
    });
  };

  const Login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      CheckoutAdmin();
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "auth/user-not-found":
          alert("user not found!");
          setError("user not found!");
          break;
        case "auth/email-already-exists":
          alert("email is already in use by an existing user!");
          setError("email is already in use by an existing user!");
          break;
        case "auth/invalid-email":
          alert(
            "email user property is invalid. It must be a string email address!"
          );
          setError(
            "email user property is invalid. It must be a string email address!"
          );
          break;
        case "auth/invalid-password":
          alert("The provided password is invalid!");
          setError("The provided password is invalid!");

          break;
        case "auth/wrong-password":
          alert("The provided value for the password user property is wrong");
          setError(
            "The provided value for the password user property is wrong"
          );

          break;
        case "auth/too-many-requests":
          alert(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later!"
          );
          setError(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later!"
          );

          break;
      }
      console.log(err.message);
    }
  };
  return (
    <div className="ssds">
      {admin ? (
        <></>
      ) : (
        <div className="dupa">
          <h1>Login in </h1>
          <p style={{ color: "red" }}>{error}</p>

          <input
            type="email"
            placeholder="email..."
            autocomplete="on"
            name="email"
            autocompletetype="email"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
          <br />
          <input
            type="password"
            placeholder="password..."
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
          <br />

          <Button
            onClick={(e) => {
              Login();
            }}
          >
            Login
          </Button>
        </div>
      )}
      
      {admin ? <AdminPage /> : <></>}
    </div>
  );
};
export let user;
export default SingInComponent;
