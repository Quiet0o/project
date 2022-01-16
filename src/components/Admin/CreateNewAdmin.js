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

  const Register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await addDoc(collection(db, "Admins"), {
        AdminEmail: registerEmail,
        AdminId:auth.currentUser.uid
      }).then(() =>
      setRegisterEmail(""),
      setRegisterPassword(""),
      setShow(!show)
      );
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
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

            {/* <Form.Text className="text-danger">{errorPassword}</Form.Text> */}
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
