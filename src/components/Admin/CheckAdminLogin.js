import React, { useContext } from 'react'
import SingInComponent  from './SignInComponet';
import AdminPage from './AdminPage';
import { AdminContext } from '../../Context/AdminContext';
const CheckAdminLogin=()=>{
  const {isAdmin} = useContext(AdminContext)

    return(
      <div className="dupa">
        {isAdmin? <AdminPage/>:<SingInComponent/>}
      </div>
  
    )
  }
export default CheckAdminLogin