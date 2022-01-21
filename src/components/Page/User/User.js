import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../../../Context/AdminContext";
import { useAuth } from "../../../Context/AuthContext";
import { auth, db } from "../../config/firebase-config";
import NavBarComponet from "../NavBarComponet/NavBarComponet";

const User = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  const [userData, setUserData] = useState([]);

  async function UserLogOut() {
    await logout();
    navigate("/userLogin");
  }
  useEffect(() => {
    if (currentUser) {
      const GetUserData = async () => {
        const data = [];
        let docRef = query(
          collection(db, "Users"),
          where("UserId", "==", currentUser.uid)
        );

        onSnapshot(docRef, (snapshot) => {
          snapshot.forEach((doc) => {
            data.push({
              key: doc.id,
              ...doc.data(),
            });
            setUserData([...data]);
          });
        });
      };
      GetUserData();
      const CheckoutAdmin = async () => {
        const q = query(
          collection(db, "Admins"),
          where("AdminEmail", "==", currentUser.email)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            console.log("jestes admin");
            setIsAdmin(true);
          }
        });
      };
      CheckoutAdmin();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <NavBarComponet />

      <div className="container">
        <div className="main-body">
          {isAdmin ? (
            <>
              <h1>You are logged as an Administrator</h1>
              <Link to="/admin">back to admin dashboard</Link>
            </>
          ) : (
            userData.map((data) => {
              return (
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <h1>
                            {data.FirstName} {data.LastName}
                          </h1>
                          <div className="mt-3">
                            <h4>{data.displayName}</h4>
                            <p className="text-muted font-size-sm">
                              {data.City} {data.Address}
                            </p>
                            <button
                              className="btn btn-warning"
                              color="black"
                              onClick={(e) => UserLogOut()}
                            >
                              Sign out
                            </button>
                            <Button>Message</Button>
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
                            {data.FirstName} {data.LastName}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {data.Email}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {data.PhoneNumber}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Address</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {data.City} {data.Address}
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
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default User;
