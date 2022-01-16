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
  const Register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      await addDoc(collection(db, "Admins"), {
        AdminEmail: registerEmail,
      });
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="new-admin">
      {isAdmin ?<><AdminSideBar />

      <Alert show={true} variant="success">
        <Alert.Heading>
          Success addded new admin
          <AiOutlineCloseCircle
            // onClick={()=>{setShow(!show)}}
            className="admin-close-alert-icon"
          />
        </Alert.Heading>
      </Alert>
      <h1>Sign in new admin</h1>

      <Container>
        <Form onSubmit={(e)=>{Register()} }> 
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
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
                class="form-control"
                id="floatingPassword"
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
  
          type="submit"
          >
            Create new admin account
          </Button>
        </Form>
      </Container></>:<ErrorPage/>}
    </div>
    
  );
};
export default CreateNewAdmin;
