import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Product =({props,descExits})=>{
    const navigate = useNavigate();
    const single = `descExits` ? "single": "all";
    return(
       <div key={props.id} className={`product-${single}`}>
             <img 
               className={`product-img-${single}`}
                src={props.photoUrl}
                alt={props.title}
                onClick={()=>{navigate(`/product/${props.key}`)}}
             />
           <p className="product-title"> {props.title}</p> 
           {descExits ? <p className="product-description"> description:  {props.description}</p>:<></>}
           {descExits ? <Button> Add Product to cart</Button> :<></>}
           <p className="product-price">{props.price} zł</p>
           
        </div>
    )
}
export default Product;