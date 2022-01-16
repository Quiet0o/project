import React, { useEffect } from "react";
import Mainlogo from "../../../img/logo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {Nav, Navbar,Container,Form, Button,  FormControl, Badge} from 'react-bootstrap';

import { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
import { SearchBarContext } from "../../../Context/SearchBarContext";

const NavBarComponet = () => {

  const {CartItems} = useContext(CartContext)
  const{search,setSearch} = useContext(SearchBarContext)
  return (
    <Navbar bg="light" expand="lg" className="sticky-top" style={{zIndex:100}}>
  <Container fluid>
    <Navbar.Brand href="/"><img id="logoimg" src={Mainlogo} alt="logo"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/">Home</Nav.Link>
        
      </Nav>
      <Nav>
        <Button id="wyszukaj" >
        <AiOutlineSearch className="search-icon"  />
        </Button>
      <Form id="wpisz" className="d-flex">
        <FormControl id="wpisz"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e)=>{
            setSearch(e.target.value)
          }}
        />
        
      </Form>
      </Nav>
      
      <Nav.Link href="/shoppingCart">
          <AiOutlineShoppingCart className="shop-icon" style={{ height: "35px", fontSize: "1.5em" }} />
           { CartItems.length > 0?<Badge pill>{CartItems.length}</Badge>:<></>}
        </Nav.Link>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};  
export default NavBarComponet;