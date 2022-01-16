import React, { useState } from 'react'
import { Container } from 'react-bootstrap';


import AdminSideBar from './AdminSideBar';
const AdminPage =()=>{

    return (
        <div className="admin-page">
            <Container fluid={true}>

            <AdminSideBar/>
            </Container>
            {/* <AdminShowAllProducts /> */}
    
        </div>
    )
}
export default AdminPage;