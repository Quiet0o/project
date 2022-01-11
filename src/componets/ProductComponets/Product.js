import React, { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Product =({props,descExits})=>{
    const navigate = useNavigate();

    const {setCartItems} = useContext(CartContext)
    const {CartItems} = useContext(CartContext)
    
    const single = descExits ? "single": "all";

    const saveToLocalStorage = () => {
      if(localStorage.getItem('cart') !== null){
        localStorage.setItem('cart',JSON.stringify(CartItems));
      }else{
        localStorage.setItem('cart',JSON.stringify([]));
        
      }
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
           {descExits ? <Button onClick={(e)=>{setCartItems(prev =>[...prev,props]);saveToLocalStorage();console.log(props); }}> Add Product to cart</Button> :<></>}
           
           <p className={`product-price-${single}`}>{props.price} zł</p>
           
        </div>
    )
}
export default Product;