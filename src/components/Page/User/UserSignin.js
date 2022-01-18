import React from 'react'
import NavBarComponet from '../NavBarComponet/NavBarComponet'
import Piwo from "../../../img/piwo.jpeg"
import Piwo2 from "../../../img/piwo2.jpg"
const UserSignin = () => {
    return(
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
                style={{height:"100%"}}
                alt="Sample photo"
                className="img-fluid"
                style={{borderTopLeftRadius: ".25rem", borderBottomLeftRadius: ".25rem"}}
              />
            </div>
            <div className="col-xl-6">
              <div className="card-body p-md-5 text-black">
                <h3 className="mb-5 text-uppercase">User registration form</h3>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example1m" className="form-control form-control-lg" required />
                      <label className="form-label" for="form3Example1m">First name</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example1n" className="form-control form-control-lg"  required/>
                      <label className="form-label" for="form3Example1n">Last name</label>
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="form3Example97" className="form-control form-control-lg"  required/>
                  <label className="form-label" for="form3Example97">Email </label>
                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example97" className="form-control form-control-lg" required />
                  <label className="form-label" for="form3Example97">City </label>
                </div>

                <div className="form-outline mb-4">
                  <input type="text" id="form3Example8" className="form-control form-control-lg"  required/>
                  <label className="form-label" for="form3Example8">Address</label>
                </div>

 
                <div className="form-outline mb-4">
                  <input type="tel" id="form3Example9" className="form-control form-control-lg" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       required/>
                  <label className="form-label" for="form3Example9">Phone number</label>
                </div>

                <div className="form-outline mb-4">
                <input type="text" pattern="[0-9]{5}" title="Five digit zip code"id="form3Example9" className="form-control form-control-lg" required />
                <label className="form-label" for="form3Example90">postcode</label>
                </div>

      
               

                <div className="d-flex justify-content-end pt-3">
                  <button type="button" className="btn btn-light btn-lg">Reset all</button>
                  <button type="button" className="btn btn-warning btn-lg ms-2">Submit form</button>
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
    )
}
export default UserSignin