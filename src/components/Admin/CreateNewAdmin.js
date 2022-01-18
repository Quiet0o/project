import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AdminContext } from "../../Context/AdminContext";
import { auth, db } from "../config/firebase-config";
import ErrorPage from "../Page/ErrorPage";
import AdminSideBar from "./AdminSideBar";
const CreateNewAdmin = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const {isAdmin} = useContext(AdminContext)
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const Register = async () => {
    try {
        const originalUser = auth.currentUser;

        const res = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

        const user = res.user;

        await addDoc(collection(db, "Admins"), {
            AdminId: user.uid,
            AdminEmail: registerEmail
        }).then(() =>
            setRegisterEmail(""),
            setRegisterPassword(""),
            setShow(!show),
            auth.updateCurrentUser(originalUser)
        );

    } catch (err) {
      console.error(err);
      alert(err.message);
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
    }
  }
    // try {
    //   await createUserWithEmailAndPassword(
    //     auth,
    //     registerEmail,
    //     registerPassword
    //   );

    //   await addDoc(collection(db, "Admins"), {
    //     AdminEmail: registerEmail,
    //     AdminId:auth.currentUser.uid
    //   }).then(() =>
    //             setRegisterEmail(""),
    //             setRegisterPassword(""),
    //             setShow(!show)
    //   );
    // } catch (err) {
    //   console.log(err.message);
    //   alert(err.message);
    // }
  };

  return (
    <div className="new-admin">
      {isAdmin ?<>

        <AdminSideBar />
          <Alert show={show} variant="success">
            <Alert.Heading>
              Success addded new admin
              <AiOutlineCloseCircle
                onClick={() => {
                  setShow(!show);
                }}
                className="admin-close-alert-icon"
              />
            </Alert.Heading>
          </Alert>

      <Container>
      <h1>Create new Admin</h1>
        <Form > 
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <div class="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                value={registerEmail}
                onChange={(e)=>setRegisterEmail(e.target.value)}
                placeholder="name@example.com"
                autocompletetype="email"
                required
              />
              <label for="floatingInput">
                <Form.Text className="text-muted">Email address</Form.Text>
              </label>
              <Form.Text className="text-danger">{error}</Form.Text>
            </div>
            {/* <Form.Text className="text-danger">{error}</Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>

            <div class="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                value={registerPassword}
                onChange={(e)=>setRegisterPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <label for="floatingPassword">
                <Form.Text className="text-muted">Password</Form.Text>
              </label>
            </div>

            <Form.Text className="text-danger">{errorPassword}</Form.Text>
          </Form.Group>

          <Button
            onClick={() => {
              Register();
            }}
          >
            Create new admin account
          </Button>
        </Form>
      </Container></>:<ErrorPage/>}
    </div>
    
  );
};
export default CreateNewAdmin;
