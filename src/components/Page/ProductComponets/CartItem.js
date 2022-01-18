import React, { useContext, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
const CartItem = ({ props, quantity }) => {
  const { CartItems } = useContext(CartContext);
  let quantityNumber = props.quantity_cart;
  const navigate = useNavigate();
  const decreaseProductQuantity = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const { key: prodId } = props;

    const index = cart.indexOf(prodId);

    if (index > -1) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
  }

  const removeProduct = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const { key: prodId } = props;
    
    cart = cart.filter(item => item !== prodId);

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
  }

  const addToCart = async (props) => {
    localStorage.setItem('cart', JSON.stringify([...CartItems, props.key]));
    window.location.reload(false);
  }

  return (
    <div className="row main align-items-center">
      <div className="col-2">
        <img
      
          className="img-fluid"
          
          src={props.photoUrl}
          alt={props.title}
          onClick={() => { navigate(`/product/${props.key}`) }}
        />
      </div>
      <div className="col">
        <div className="row">{props.title}</div>
      </div>
      <div className="col">
        <a href="#" onClick={(e) => (decreaseProductQuantity())}>-</a>
        <a href="#">{quantityNumber}</a>
        <a href="#" onClick={(e) => addToCart(props)}>+</a>
      </div>
      <div className="col">
        {props.price} zł
        <AiFillDelete
          style={{marginLeft:"5px"}}
          className="close"
          onClick={(e) => {
            removeProduct();
          }}
        />
      </div>
    </div>
  );
};
export default CartItem;
