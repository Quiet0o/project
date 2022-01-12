import React from 'react'
import SingInComponent, { user } from './SignInComponet';
import AdminPage from './AdminPage';
const CheckAdminLogin=()=>{
    console.log(user)

    return(
      <div className="dupa">
        {user? <AdminPage/>:<SingInComponent/>}
      </div>
  
    )
  }
export default CheckAdminLogin