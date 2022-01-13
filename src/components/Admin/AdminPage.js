import React, { useState } from 'react'
import AddProducts from "./AddProducts"
import {Button} from 'react-bootstrap'
import { user } from './SignInComponet'
import AddBrand from './AddBrand';
import CreateNewAdmin from './CreateNewAdmin';
import AdminSideBar from './AdminSideBar';
const AdminPage =()=>{
    // const [visible,setVisible] = useState(user)
    // const [visibleAdmin,setVisibleAdmin] = useState(user)
    // const [visibleBrandSite,setVisibleBrandSite] = useState(user)

    
    // const ShowAddProduct =()=>{
    //     setVisible(!visible)
    // }
    // const ShowCreateAdmins =()=>{
    //     setVisibleAdmin(!visibleAdmin)
    // }
    // const ShowCreateNewBrand =()=>{
    //     setVisibleBrandSite(!visibleBrandSite)
    // }
    return (
        <div className="admin-page">
            <AdminSideBar/>
            {/* {visible? <></>: <Button onClick={ShowAddProduct}>Add Product</Button>}
            {visibleAdmin? <></>: <Button onClick={ShowCreateAdmins}>Create  new Admin</Button>}
            {visibleBrandSite? <></>: <Button onClick={ShowCreateNewBrand}>Add new Brand</Button>}
            {visibleAdmin ? <AddProducts/> :<></>}
            {visible?<CreateNewAdmin/>:<></>}
            {visibleBrandSite?<AddBrand/>:<></>}
            <ShowProducts/> */}
        </div>
    )
}
export default AdminPage;