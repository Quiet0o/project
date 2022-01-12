import React, { useEffect, useState } from "react";
import { CartContext } from "../../../Context/CartContext";
import { useContext } from "react";
import CartItem from "./CartItem";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase-config";

const ItemsInCart = () => {
  const [ProductsInCart, setProductsInCart] = useState([]);
  const [ItemsInCartPrice, setItemsInCartPrice] = useState(0);
  const { CartItems } = useContext(CartContext);
  let liczba=0;
  useEffect(() => {
    CartItems.map((cartItem) => {
      const dupa = async () => {
        const getSingleProduct = [];

        onSnapshot(doc(db, "Products", cartItem), (doc) => {
          // console.log("Current data: ", doc.data());
          getSingleProduct.push({
            key: doc.id,
            ...doc.data(),
          });

          setProductsInCart((prev) => [...prev, ...getSingleProduct]);
          // setItemsInCartPrice(ItemsInCartPrice+ItemsInCartPrice.price)
        });
      };
      dupa();
      
    });

  }, [CartItems]);
  useEffect(() => {
    console.log("ddd");
    console.log(CartItems);
    CartItems.map((item) => {
      console.log(item);
      setItemsInCartPrice(ItemsInCartPrice+item.price);
    })
    console.log(ProductsInCart);
  },[])

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
        <h1>Aktualna cena w koszyku: {ItemsInCartPrice}</h1>
        </div>
      :
      <h1>koszyk jest pusty</h1>}
    </div>
  );
};
export default ItemsInCart;
