import React, { useContext, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartContext } from "../../../Context/CartContext";
const CartItem = ({ props, quantity }) => {
  const { CartItems } = useContext(CartContext);
  let quantityNumber = props.quantity_cart;
  const RemoveDataFromLocalStorage = (index) => {
    const data = CartItems;

    console.log(CartItems.indexOf(index));
    console.log(data);
    console.log(index);
    console.log(CartItems.indexOf(index) - 1, CartItems.indexOf(index));
    // data.splice(CartItems.indexOf(index), CartItems.indexOf(index));
    // localStorage.setItem("cart", JSON.stringify(data));
    // window.location.reload(false);
  };

  const addToCart = async (props) => {
    localStorage.setItem('cart', JSON.stringify([...CartItems, props.key]));
    window.location.reload(false);
  }

  return (
    <div className="row main align-items-center">
      <div className="col-2">
        {props.photoUrl?<img
          height="150"
          width="150"
          style={{ float: "left" }}
          className="img-fluid"
          src={props.photoUrl}
          alt={props.title}
        />:<p>Error with Item</p>}
      </div>
      <div className="col">
        <div className="row">{props.title}</div>
      </div>
      <div className="col">
        <a href="#" onClick={(e) => (RemoveDataFromLocalStorage(props.key))}>-</a>
        <a href="#">{quantityNumber}</a>
        <a href="#" onClick={(e) => addToCart(props)}>+</a>
      </div>
      <div className="col">
        {props.price} zł
        <AiFillDelete
          style={{marginLeft:"5px"}}
          className="close"
          onClick={(e) => {
            RemoveDataFromLocalStorage(props.key);
          }}
        />
      </div>
    </div>
  );
};
export default CartItem;
