import React, { useState } from 'react'
import AddProducts from "./AddProducts"
import AdminShowAllProducts from "./AdminShowAllProducts"
import { user } from './SignInComponet'

import AdminSideBar from './AdminSideBar';
const AdminPage =()=>{

    return (
        <div className="admin-page">
            <AdminSideBar/>
            {/* <AdminShowAllProducts /> */}
    
        </div>
    )
}
export default AdminPage;