import React, { useEffect, useRef, useState } from "react";
import { CartContext } from "../../../Context/CartContext";
import { useContext } from "react";
import CartItem from "./CartItem";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase-config";

const ItemsInCart = () => {
  const [ProductsInCart, setProductsInCart] = useState([]);
  const [cyce, setCyce] = useState(0);
  const ref = useRef(cyce)
  const { CartItems } = useContext(CartContext);
  var count = {};
  let liczba=0;
  let i=0;
  let quantity=0;
  useEffect(() => {
    CartItems.forEach(function(i) { count[i] = (count[i]||0) + 1;});

    Object.keys(count).map((cartItem) => {
     
      quantity = Object.values(count)[i];

      const dupa = async (quantity) => {
      
        const getSingleProduct = [];

        onSnapshot(doc(db, "Products", cartItem), (doc) => {
          getSingleProduct.push({
            key: doc.id,
            quantity:quantity,
            ...doc.data(),
          });
          getSingleProduct.map((test)=>{

            liczba+=test.price*test.quantity
            ref.current = liczba;

          });
          setProductsInCart((prev) => [...prev, ...getSingleProduct]);
        });
    
      };
      dupa(quantity)
      i++;
    });
  }, [CartItems]);

  const CartItemsElement = () => {
      
    return ProductsInCart.map((item) => {

      return (
        <div className="cart-single-product-main">
          <CartItem props={item} />
        </div>
      );
    });
  };
  return (
    <div className="cart-page-main">
    {CartItems.length> 0? 
      <div className="cart-no-empty">
        <CartItemsElement />
        <h1>Aktualna cena w koszyku: {ref.current} zł</h1>
        </div>
      :
      <h1>koszyk jest pusty</h1>}
    </div>
  );
};
export default ItemsInCart;
