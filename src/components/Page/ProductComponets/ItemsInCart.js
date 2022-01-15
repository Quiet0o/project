import React, { useEffect, useRef, useState } from "react";
import { CartContext } from "../../../Context/CartContext";
import { useContext } from "react";
import CartItem from "./CartItem";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import NavBarComponet from "../NavBarComponet/NavBarComponet";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineDoubleLeft } from "react-icons/ai";

const ItemsInCart = () => {
  const [ProductsInCart, setProductsInCart] = useState([]);
  const ref = useRef(0);
  const { CartItems } = useContext(CartContext);
  var count = {};
  let liczba = 0;
  let i = 0;
  let quantity = 0;
  useEffect(() => {
    CartItems.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    Object.keys(count).map((cartItem) => {
      quantity = Object.values(count)[i];
      console.log(quantity);
      
      const dupa = async (quantity) => {
        const getSingleProduct = [];
        
        onSnapshot(doc(db, "Products", cartItem), (doc) => {
          getSingleProduct.push({
            key: doc.id,
            quantity: quantity,
            ...doc.data(),
          });
          getSingleProduct.map((test) => {
            liczba += test.price * test.quantity;
            ref.current = liczba;
          });
          setProductsInCart((prev) => [...prev, ...getSingleProduct]);
        });
      };
      dupa(quantity);
      i++;
    });
  }, [CartItems]);

  const CartItemsElement = () => {
    return ProductsInCart.map((item) => {
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
      <div className="row">
        <div className="col-md-8 cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </div>
              <div className="col align-self-center text-right text-muted">
              {CartItems.length} items
              </div>
            </div>
          </div>
          {CartItems.length > 0 ? <CartItemsElement /> : <div className="row"><h1>Koszyk jest pusty</h1></div>}

          <div className="back-to-shop">
            <AiOutlineDoubleLeft/>
            <span className="text-muted">Back to shop</span>
          </div>
        </div>
        <div className="col-md-4 summary">
          <div>
            <h5>
              <b>Summary</b>
            </h5>
          </div>
          <hr />
          <div className="row">
            <div className="col">ITEMS {CartItems.length}</div>
            <div className="col text-right">{ref.current} zł</div>
          </div>
          <form>
            <p>SHIPPING</p>{" "}
            <select>
              <option class="text-muted">Standard-Delivery- &euro;5.00</option>
            </select>
            <p>GIVE CODE</p> <input id="code" placeholder="Enter your code" />
          </form>
          <div className="row">
            <div className="col">TOTAL PRICE</div>
            <div className="col text-right">{ref.current} zł</div>
          </div>
         <Button>Checkout</Button>
        </div>
      </div>
    </div>
  );
};
export default ItemsInCart;
