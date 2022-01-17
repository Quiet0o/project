import React, { useContext } from 'react'
import SingInComponent  from './SignInComponet';
import AdminPage from './AdminPage';
import { AdminContext } from '../../Context/AdminContext';
import { Container } from 'react-bootstrap';
const CheckAdminLogin=()=>{
  const {isAdmin} = useContext(AdminContext)

    return(
      <>
        {isAdmin? <AdminPage/>:<SingInComponent/>}
      </>
  
    )
  }
export default CheckAdminLogin