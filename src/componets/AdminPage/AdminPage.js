import React, { useState } from 'react'
import ShowProducts from "../ProductComponets/ShowProducts"
import AddProducts from "../ProductComponets/AddProducts"
import {Button} from 'react-bootstrap'
import { user } from '../../SignInComponet/SignInComponet'
import CreareNewAdmin from '../CreateNewAdmin/CreateNewAdmin';
const AdminPage =()=>{
    const [visible,setVisible] = useState(user)
    const [visibleAdmin,setVisibleAdmin] = useState(user)

    
    const ShowAddProduct =()=>{
        setVisible(!visible)
    }
    const ShowCreateAdmins =()=>{
        setVisibleAdmin(!visibleAdmin)
    }
    return (
        <div className="admin-page">
            {visible? <></>: <Button onClick={ShowAddProduct}>Add Product</Button>}
            {visible? <></>: <Button onClick={ShowCreateAdmins}>Create  new Admin</Button>}
            {visible ? <AddProducts/> :<></>}
            {visibleAdmin?<CreareNewAdmin/>:<></>}
            <ShowProducts/>
        </div>
    )
}
export default AdminPage;