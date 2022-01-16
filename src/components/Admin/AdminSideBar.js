import { signOut } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import {Nav, Navbar,Container, Offcanvas, Button} from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../Context/AdminContext';
import { auth } from '../config/firebase-config';


function AdminSideBar() {
  const {setIsAdmin,isAdmin} = useContext(AdminContext)
  const navigate = useNavigate();

  const LogOut = async () => {
    setIsAdmin(false)
    navigate("/admin")
    localStorage.setItem('admin', false);  
    await signOut(auth);
  };
  return (
    <Navbar bg="light" expand={false} >
    <Container fluid>
      <Navbar.Toggle aria-controls="offcanvasNavbar" />
      <Navbar.Offcanvas
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel">Admin Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-start flex-grow-1 pe-3">
            <Nav.Link href="/admin">Home</Nav.Link>
            <Nav.Link href="/admin/products">Products</Nav.Link>
            <Nav.Link href="/admin/create/newAdmin">Create Admin</Nav.Link>
            <Nav.Link href="/admin/create/product">Create Product</Nav.Link>
            <Nav.Link href="/admin/create/brand">Create Brand</Nav.Link>
            <Nav.Link href="/admin/create/type">Create Type</Nav.Link>
            </Nav>
        </Offcanvas.Body>
      {/* <p class="text-center fs-5">{auth.currentUser.email}</p> */}
      <Button onClick={(e)=>{LogOut()}}>Log out</Button>
      </Navbar.Offcanvas>
    <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default AdminSideBar;