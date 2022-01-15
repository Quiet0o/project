import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import {Nav, Navbar,Container, Offcanvas, Button} from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { auth } from '../config/firebase-config';


function AdminSideBar() {

  const LogOut = async () => {
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
            <Nav.Link href="/admin/products"></Nav.Link>
            </Nav>
        </Offcanvas.Body>
      {/* <p class="text-center fs-5">{auth.currentUser.email}</p> */}
      <Button onClick={(e)=>{LogOut()}}>Log out</Button>
      </Navbar.Offcanvas>
    <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default AdminSideBar;