import React, { useEffect } from "react";
import Mainlogo from "../../../img/logo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  Nav,
  Navbar,
  Container,
  Form,
  Button,
  FormControl,
  Badge,
} from "react-bootstrap";

import { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
import { SearchBarContext } from "../../../Context/SearchBarContext";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import { GrUser, GrUserAdmin, GrUserNew } from "react-icons/gr";
import { useAuth } from "../../../Context/AuthContext";

const NavBarComponet = () => {
  const { CartItems, setCartItems } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchBarContext);
  const { currentUser } = useAuth();

  useEffect(() => {
    CartItems.map((CartItem) => {
      onSnapshot(doc(db, "Products", CartItem), (doc) => {
        if (doc.exists()) {
          // console.log("istnieje");
          setCartItems(JSON.parse(localStorage.getItem("cart")));
        } else {
          // console.log("nie istnieje");
          CartItems.splice(
            CartItems.indexOf(CartItem),
            CartItems.indexOf(CartItem)
          );
          localStorage.setItem("cart", JSON.stringify(CartItems));
          setCartItems(JSON.parse(localStorage.getItem("cart")));
        }
      });
    });
  }, []);
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="sticky-top"
      style={{ zIndex: 100, backgroundColor: "white" }}
    >
      <Container fluid style={{ backgroundColor: "white" }}>
        <Navbar.Brand href="/">
          <img id="logoimg" src={Mainlogo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            <Button>
              <AiOutlineSearch className="search-icon" />
            </Button>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Form>
          </Nav>

          <Nav.Link href="/shoppingCart">
            <AiOutlineShoppingCart
              className="shop-icon"
              style={{ height: "35px", fontSize: "1.5em" }}
            />
            {CartItems.length > 0 ? (
              <Badge style={{ marginLeft: "-5px" }} pill>
                {CartItems.length}
              </Badge>
            ) : (
              <></>
            )}
          </Nav.Link>

          {currentUser ? (
            <Nav.Link href="/user">
              {currentUser ? (
                <GrUserAdmin fontSize="2em" color="green" />
              ) : (
                <GrUser fontSize="2em" />
              )}
            </Nav.Link>
          ) : (
            <Nav.Link href="/userLogin">
              <GrUser fontSize="2em" />
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBarComponet;
