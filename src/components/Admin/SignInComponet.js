import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import AdminPage from "./AdminPage";
import {AdminContext} from "../../Context/AdminContext";
import { Button, Container, Form } from "react-bootstrap";
import { UserContext } from "../../Context/UserContext";

const SingInComponent = () => {

  const {isAdmin, setIsAdmin} = useContext(AdminContext)
  const {user,setUser} = useContext(UserContext)
  const [dupa, setdupa] = useState({});
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser);
    
  })

  const CheckoutAdmin = async () => {
    const adminsCheck = [];
    const querySnapshot = await getDocs(collection(db, "Admins"));


    querySnapshot.forEach((doc) => {
      adminsCheck.push({ ...doc.data() });

      if (auth.currentUser.email !== doc.data().AdminEmail) {
        setError("You are not admin on this page");
      } else {
        setIsAdmin(!isAdmin);
        localStorage.setItem('admin', true);  
      }
      return true;
    });
  };

  const Login = async () => {
    try {
        await signInWithEmailAndPassword(
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
          setErrorPassword("The provided password is invalid!");

          break;
        case "auth/wrong-password":
          alert("The provided value for the password user property is wrong");
          setErrorPassword(
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
    <div className="admin-sign-in">
      {isAdmin ? (
        <></>
      ) : (
        <div className="admin-sign-in-form">
          <Container>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    autocompletetype="email"
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                    }}
                    required
                  />
                  <label for="floatingInput">
                    <Form.Text className="text-muted">Email address</Form.Text>
                  </label>
                </div>
                <Form.Text className="text-danger">{error}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>

                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                    }}
                    required
                  />
                  <label for="floatingPassword">
                    <Form.Text className="text-muted">Password</Form.Text>
                  </label>
                </div>

                <Form.Text className="text-danger">{errorPassword}</Form.Text>
              </Form.Group>

              <Button
                onClick={(e) => {
                  Login();
                }}
                // type="submit"
              >
                Login
              </Button>
            </Form>
          </Container>
        </div>
      )}

      {isAdmin ? <AdminPage /> : <></>}
    </div>
  );
};
export default SingInComponent;
