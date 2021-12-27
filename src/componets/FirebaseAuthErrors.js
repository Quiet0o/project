import React from 'react'
const FirebaseErrors =() =>{
    const HanlerError =(error) =>{
        switch (error) {
            case "auth/user-not-found":
              alert("user not found!");
              break;
            case "auth/email-already-exists":
              alert(" email is already in use by an existing user!");
              break;
            case "auth/invalid-email":
              alert("email user property is invalid. It must be a string email address!");
              break;
              case "auth/invalid-password":
                alert("The provided value for the password user property is invalid!");
                break;
                case "auth/wrong-password":
                  alert("The provided value for the password user property is invalid2!");
                  break;
              case "auth/too-many-requests":
                    alert("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later!");
                    break;
    }
}
    return(
        <></>
    )
}
export default FirebaseErrors