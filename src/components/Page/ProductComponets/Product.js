import React from "react";
import { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Product =({props,descExits})=>{

    const navigate = useNavigate();

    const {CartItems, setCartItems} = useContext(CartContext)
    
    const single = descExits ? "single": "all";

    const addToCart = async () => {
        localStorage.setItem('cart', JSON.stringify([...CartItems, props.key]));

        setCartItems(prev => [...prev, props.key]);
    }

    return (
       <div key={props.id} className={`product-${single}`}>
            <img 
                className={`product-img-${single}`}
                src={props.photoUrl}
                alt={props.title}
                onClick={()=>{navigate(`/product/${props.key}`)}}
            />
           <p className={`product-title-${single}`}> {props.title}</p> 
           
           {descExits ? <p className={`product-description-${single}`}> description:  {props.description}</p>:<></>}
                     
           {descExits ? <Button onClick={() => addToCart()}>Add Product to cart</Button> : undefined}

           <p className={`product-price-${single}`}>{props.price} zł</p>
           
        </div>
    )
}
export default Product;