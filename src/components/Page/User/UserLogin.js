import React, { useEffect } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { MdFacebook, MdFaceUnlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NavBarComponet from "../NavBarComponet/NavBarComponet";
const UserLogin = () => {

    const navigate = useNavigate();

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
                      required
                    />
                    <label className="form-label" for="typeEmailX">
                      Email
                    </label>
                  </div>

                  <div className="form-outline form-mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      required
                    />
                    <label className="form-label" for="typePasswordX">
                      Password
                    </label>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-50" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  <button
                    className="btn btn-outline-dark btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" >
                     <MdFacebook fontSize="3em" color="black"/>
                    </a>
                    <a href="#!" >
                     <AiFillGoogleCircle fontSize="3em" color="black"/>
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
