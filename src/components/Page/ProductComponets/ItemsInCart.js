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
            <AiOutlineDoubleLeft style={{cursor: 'pointer'}} onClick={(e)=>{navigate(`/`)}}/>
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
              <option class="text-muted">Standard-Delivery-5.00zł</option>
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
