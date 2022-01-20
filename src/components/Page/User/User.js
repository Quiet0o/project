import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import { auth } from "../../config/firebase-config";
import NavBarComponet from "../NavBarComponet/NavBarComponet";

const User = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const UserLogOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <NavBarComponet />
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={user?.photoURL}
                      alt="Admin"
                      className="rounded-circle"
                      height="150pc"
                    />
                    <div className="mt-3">
                      <h4>{user?.displayName}</h4>
                      <p className="text-muted font-size-sm">
                        Bay Area, San Francisco, CA
                      </p>
                      <button className="btn btn-warning" color="black" onClick={(e)=>(UserLogOut())}>Sign out</button>
                      <button className="btn btn-outline-primary">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                     {user?.displayName}
                     </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{user?.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (239) 816-9029
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      Bay Area, San Francisco, CA
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <a
                        className="btn btn-info "
                        target="__blank"
                        href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
