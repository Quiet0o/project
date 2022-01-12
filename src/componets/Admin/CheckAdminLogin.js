import React from 'react'
import SingInComponent, { user } from './SignInComponet';
import AdminPage from './AdminPage';
import { auth } from '../confing/firebase-config';
const CheckAdminLogin=()=>{
    console.log(user)

    return(
      <div className="dupa">
        {user? <AdminPage/>:<SingInComponent/>}
      </div>
  
    )
  }
export default CheckAdminLogin