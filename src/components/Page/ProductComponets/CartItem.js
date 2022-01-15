import React, { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartContext } from "../../../Context/CartContext";
const CartItem = ({ props }) => {
  const { CartItems } = useContext(CartContext);
  const RemoveDataFromLocalStorage = (index) => {
    const data = CartItems;

    console.log(CartItems.indexOf(index));

    data.splice(0, CartItems.indexOf(index));
    localStorage.setItem("cart", JSON.stringify(data));
    window.location.reload(false);
  };
  return (
    <div className="row main align-items-center">
      <div className="col-2">
        <img
          height="150"
          width="150"
          style={{ float: "left" }}
          className="img-fluid"
          src={props.photoUrl}
          alt={props.title}
        />
      </div>
      <div className="col">
        <div className="row">{props.title}</div>
      </div>
      <div className="col">
        <a href="#">+</a>
        <a href="#">{props.quantity}</a>
        <a href="#">+</a>
      </div>
      <div className="col">
        {props.price} zł 
        <AiFillDelete
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
