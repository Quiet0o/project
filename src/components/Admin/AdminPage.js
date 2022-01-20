import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../Context/UserContext';


import AdminSideBar from './AdminSideBar';
const AdminPage =()=>{
    const {user} = useContext(UserContext)

    useEffect(() => {
        console.log(user);
    },[])
    return (
        
        <div className="admin-page">
                <AdminSideBar/>
               
            {/* <AdminShowAllProducts /> */}
    
        </div>
    )
}
export default AdminPage;