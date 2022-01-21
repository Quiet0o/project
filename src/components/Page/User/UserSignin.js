import React, { useContext, useState } from "react";
import NavBarComponet from "../NavBarComponet/NavBarComponet";
import Piwo from "../../../img/piwo.jpeg";
import Piwo2 from "../../../img/piwo2.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase-config";
import { addDoc, collection } from "firebase/firestore";
const UserSignin = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const Register = async () => {
    try {
        const originalUser = auth.currentUser;

        const res = await createUserWithEmailAndPassword(auth, email, password);

        const user = res.user;

        await addDoc(collection(db, "Users"), {
            UserId: user.uid,
            Email: email,
            FirstName:firstName,
            LastName: lastName,
            PhoneNumber:phoneNumber,
            City:city,
            Address:address,
            Postcode:postcode

        }).then(() =>
        setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPassword(""),
        setPhoneNumber(""),
        setCity(""),
        setAddress(""),
        setPostcode(""),
        setPassword2("")
        );

    } catch (err) {
      console.error(err);
      alert(err.message);
      alert(err.code);
      alert(err);
      console.log(err.message);
      switch (err.code) {
     
          case "auth/email-already-in-use":
            alert("email is already in use by an existing user!");
            setError("email is already in use by an existing user!");
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

    }
  }

  };


  const CheckPassword =()=>{
    console.log(password ,"=>",password2);
    if (password != password2) {
      setErrorPassword("The password must match!");
    }
  }

  return (
    <>
      <NavBarComponet />
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src={Piwo}
                      style={{ height: "100%" }}
                      alt="Sample photo"
                      className="img-fluid"
                      style={{
                        borderTopLeftRadius: ".25rem",
                        borderBottomLeftRadius: ".25rem",
                      }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">User registration</h3>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" for="form3Example1m">
                              First name
                            </label>
                            <input
                              type="text"
                              id="form3Example1m"
                              className="form-control form-control-lg"
                              placeholder="First name"
                              value={firstName}
                              onChange={(e) => {setFirstName(e.target.value)}}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" for="form3Example1n">
                              Last name
                            </label>
                            <input
                              type="text"
                              id="form3Example1n"
                              className="form-control form-control-lg"
                              placeholder="Last name"
                              value={lastName}
                              onChange={(e) => {setLastName(e.target.value)}}
                              required
                            />
                          </div>
                        </div>
                          <p className="text-danger">{error}</p>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example97">
                          Email
                        </label>
                        <input
                          type="email"
                          id="form3Example97"
                          placeholder="name@example.com"
                          autocompletetype="email"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => {setEmail(e.target.value)}}
                          required
                        />
                      </div>
                      <p className="text-danger">{error}</p>
                      <div className="form-outline mb-4">
                        
                        <label className="form-label" for="form3Example97">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form3Example97"
                          placeholder="Password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => {setPassword(e.target.value)}}
                          required
                        />
                      </div>
                      <p className="text-danger">{error}</p>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example97">
                          Please repeat password
                        </label>
                        <input
                          type="password"
                          id="form3Example97"
                          placeholder="Please repeat password"
                          className="form-control form-control-lg"
                          value={password2}
                          onChange={(e) => {setPassword2(e.target.value);CheckPassword()}}
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example97">
                          City{" "}
                        </label>
                        <input
                          type="text"
                          id="form3Example97"
                          className="form-control form-control-lg"
                          placeholder="City"
                          value={city}
                          onChange={(e) => {setCity(e.target.value)}}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example8">
                          Address
                        </label>
                        <input
                          type="text"
                          id="form3Example8"
                          className="form-control form-control-lg"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => {setAddress(e.target.value)}}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example9">
                          Phone number
                        </label>
                        <input
                          type="tel"
                          id="form3Example9"
                          className="form-control form-control-lg"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          required
                          value={phoneNumber}
                          onChange={(e) => {setPhoneNumber(e.target.value)}}
                          placeholder="Phone Number"
                        />
                      </div>
                    <p className="text-danger">{error}</p>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example90">
                          postcode
                        </label>
                        <input
                          type="text"
                          pattern="[0-9]{5}"
                          title="Five digit zip code"
                          id="form3Example9"
                          placeholder="postcode"
                          className="form-control form-control-lg"
                          value={postcode}
                          onChange={(e) => {setPostcode(e.target.value)}}
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-warning btn-lg ms-2"
                          onClick={(e)=>{Register()}}
                        >
                          Register new user
                        </button>
                      </div>
                    </div>
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
export default UserSignin;
