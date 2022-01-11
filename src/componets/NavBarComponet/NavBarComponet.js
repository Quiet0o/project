import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Mainlogo from "../../img/logo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {Nav, Navbar, NavDropdown, MenuItem,Container,Form ,  Tabs, ButtonToolbar, Button, Table, ButtonGroup, Row, Col, Grid, Panel, FormGroup, FormControl, Badge} from 'react-bootstrap';

import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

const NavBarComponet = () => {

  const {CartItems} = useContext(CartContext)
  const [NumberOfItemsInCart, setNumberOfItemsInCart] = useState([])
  useEffect(() => {
      setNumberOfItemsInCart(CartItems)
      const getLocalStorage = () => {
        if(localStorage.getItem('cart') === null){
          localStorage.setItem('cart',JSON.stringify([]));
        }else{
        let todoFromLocal =  JSON.parse(localStorage.getItem("cart"));
        // console.log(todoFromLocal);
        setNumberOfItemsInCart([...todoFromLocal]);
        // dupa = todoFromLocal\
        }
      };
      getLocalStorage()
      // console.log(NumberOfItemsInCart);
  }, [CartItems])
  return (
    <Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="/"><img id="logoimg" src={Mainlogo} /></Navbar.Brand>
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
        />
        
      </Form>
      </Nav>
      
      <Nav.Link href="/shoppingCart">
          <AiOutlineShoppingCart className="shop-icon" style={{ height: "35px", fontSize: "1.5em" }} />
           <Badge pill>{NumberOfItemsInCart.length}</Badge>
        </Nav.Link>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};  
export default NavBarComponet;