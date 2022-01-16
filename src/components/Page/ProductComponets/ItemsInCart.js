import React, { useEffect, useRef, useState } from "react";
import { CartContext } from "../../../Context/CartContext";
import { useContext } from "react";
import CartItem from "./CartItem";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import NavBarComponet from "../NavBarComponet/NavBarComponet";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ItemsInCart = () => {
  const [ProductsInCart, setProductsInCart] = useState([]);
  const [ProductQuantity, setProductQuantity] = useState([]);
  const ref = useRef(0);
  const { CartItems } = useContext(CartContext);
  var count = {};
  const ItemsQuantity =[];
  let liczba = 0;
  let i = 0;
  let quantity = 0;
  const navigate = useNavigate();

  // const itemsQuantityNumber = useRef(j);
  useEffect(() => {
    CartItems.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    console.log(Object.keys(count));
    Object.keys(count).map((cartItem) => {
      quantity = Object.values(count)[i];
      ItemsQuantity.push(quantity);
      setProductQuantity(ItemsQuantity);
     
      const dupa = async (quantity) => {
        const getSingleProduct = [];
        
        onSnapshot(doc(db, "Products", cartItem), (doc) => {
          getSingleProduct.push({
            key: doc.id,
            quantity_cart: quantity,
            ...doc.data(),
          });
          getSingleProduct.map((test) => {
            liczba += test.price * quantity;
            ref.current = liczba;
          });
          setProductsInCart((prev) => [...prev, ...getSingleProduct]);
        });
      };
      dupa(quantity);
      i++;
    });
    // console.log(Object.values(count)[0]); ;
  }, [CartItems]);


  const CartItemsElement = () => {
    return ProductsInCart.map((item) => {
      console.log(item.quantity_cart);
      return (
        <div className="row border-top border-top">
          <CartItem props={item} />
        </div>
      );
    });
  };

  return (
    <div className="cart-page-main">
      <NavBarComponet/>
      <Container fluid={true}>
      <Row>
        <Col md={8} className="cart">
          <div className="title">
            <Row>
              <Col>
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </Col>
              <div className="col align-self-center text-right text-muted">
              {CartItems.length} items
              </div>
            </Row>
          </div>
          {CartItems.length > 0 ? <CartItemsElement /> : <Row><h1>Koszyk jest pusty</h1></Row>}

          <div className="back-to-shop">
            <AiOutlineDoubleLeft style={{cursor: 'pointer'}} onClick={(e)=>{navigate(`/`)}}/>
            <span className="text-muted">Back to shop</span>
          </div>
        </Col>
        <Col md={4} className="summary">
          <div>
            <h5>
              <b>Summary</b>
            </h5>
          </div>
          <hr />
          <Row>
            <Col>ITEMS {CartItems.length}</Col>
            <div className="col text-right">{ref.current} zł</div>
          </Row>
          <form>
            <p>SHIPPING</p>{" "}
            <select>
              <option class="text-muted">Standard-Delivery-5.00zł</option>
            </select>
            <p>GIVE CODE</p> <input id="code" placeholder="Enter your code" />
          </form>
          <Row>
            <Col>TOTAL PRICE</Col>
            <div className="col text-right">{ref.current} zł</div>
          </Row>
         <Button>Checkout</Button>
        </Col>
      </Row>
      </Container>
    </div>
  );
};
export default ItemsInCart;
