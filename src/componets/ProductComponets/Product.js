import React from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";

const Product =({props,descExits})=>{
    const navigate = useNavigate();
    const {setCartItems} = useContext(CartContext)
    const {CartItems} = useContext(CartContext)
    const single = descExits ? "single": "all";
    const saveToLocalStorage = () => {
      localStorage.setItem('cart',JSON.stringify(CartItems));
    };
    return(
       <div key={props.id} className={`product-${single}`}>
             <img 
               className={`product-img-${single}`}
                src={props.photoUrl}
                alt={props.title}
                onClick={()=>{navigate(`/product/${props.key}`)}}
             />
           <p className={`product-title-${single}`}> {props.title}</p> 
           {descExits ? <p className={`product-description-${single}`}> description:  {props.description}</p>:<></>}
            {/* {descExits ? <p className={`product-description-${single}`}> description:  {props.description}</p>:<></>} */}
           {descExits ? <Button onClick={(e)=>{setCartItems([props]);saveToLocalStorage() }}> Add Product to cart</Button> :<></>}
           
           <p className={`product-price-${single}`}>{props.price} zł</p>
           
        </div>
    )
}
export default Product;