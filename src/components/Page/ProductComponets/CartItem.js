import React, { useContext, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartContext } from "../../../Context/CartContext";
const CartItem = ({ props,quantity }) => {
  const { CartItems } = useContext(CartContext);
  let quantityNumber = props.quantity_cart;
  const RemoveDataFromLocalStorage = (index) => {
    const data = CartItems;
    
    console.log(CartItems.indexOf(index));
    
    data.splice(0, CartItems.indexOf(index));
    localStorage.setItem("cart", JSON.stringify(data));
    window.location.reload(false);
  };
  
  const addToCart = async (props) => {
    localStorage.setItem('cart', JSON.stringify([...CartItems, props.key]));
    
  }
  useEffect(() => {
    console.log("Ddd");
  },[CartItems])
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
        <a href="#"onClick={console.log("Dd")}>+</a>
        <a href="#">{quantityNumber}</a>
        <a href="#" onClick={(e)=>addToCart(props)}>+</a>
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
