import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { MdFacebook, MdFaceUnlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import NavBarComponet from "../NavBarComponet/NavBarComponet";
const UserLogin = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const CheckLogin =(err)=>{
      switch (err) {
        case "auth/user-not-found":
          alert("user not found!");
          setError("user not found!");
          break;
        case "auth/account-exists-with-different-credential":
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
    }


    const LoginWithGoogle =()=>{
      const provider  = new GoogleAuthProvider()
 
      signInWithPopup(auth, provider) .then((result) => {
        
       navigate("/")
      }).catch((error) => {
      alert("Error: " + error)
      setError(error)
      });
    }
    const LoginWithFacebook =()=>{
      const provider  = new FacebookAuthProvider();
   
      signInWithPopup(auth, provider) .then((result) => {
        
       navigate("/user")
      }).catch((error) => {
      alert("Error: " + error)
      setError(error)
      });
    }
    const Login = async () => {
        try {
            await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          navigate("/user")

        } catch (err) {
          console.log(err);
          CheckLogin(err.code)
          console.log(err.message);
        }
      };
  return (
      <>
        <NavBarComponet/>
    <section class="vh-100" >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <div className="form-outline form-mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      placeholder="name@example.com"
                      autocompletetype="email"
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      
                    />
                    <label className="form-label" for="typeEmailX">
                      Email
                    </label>
                  {error?<> <br/>
                    <label className="form-label" for="typeEmailX" style={{color: 'red'}}>
                      {error}
                    </label></>:<></>}
                  </div>

                  <div className="form-outline form-mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                    <label className="form-label" for="typePasswordX">
                      Password
                    </label>
                    {errorPassword?<> <br/>
                    <label className="form-label" for="typeEmailX" style={{color: 'red'}}>
                      {errorPassword}
                    </label></>:<></>}
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-50" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  <button
                    className="btn btn-outline-dark btn-lg px-5"
                    type="submit"
                    onClick={(e)=>{Login()}}
                  >
                    Login
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" >
                     <MdFacebook fontSize="3em" color="black" onClick={(e)=>{LoginWithFacebook()}}/>
                    </a>
                    <a href="#!" >
                     <AiFillGoogleCircle fontSize="3em" color="black" onClick={(e)=>{LoginWithGoogle()}}/>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?
                    <a href="#!" className="text-black-50 fw-bold" onClick={(e)=>{   navigate(`/userSignin`);
                        window.location.reload();}}>
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
export default UserLogin;
