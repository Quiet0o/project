import React from 'react'
import auth from '../firebase';
const UserSingOut =()=>{

  return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
  
}
export default UserSingOut