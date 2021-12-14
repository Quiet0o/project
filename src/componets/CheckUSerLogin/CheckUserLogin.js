import React from 'react'
import SingInComponent, { user } from '../../SignInComponet/SignInComponet';
import AdminPage from '../AdminPage/AdminPage';
import { auth } from '../confing/firebase-config';
const CheckUserLogin=()=>{
    console.log(user)

    return(
      <div className="dupa">
        {user? <AdminPage/>:<SingInComponent/>}
      </div>
  
    )
  }
export default CheckUserLogin