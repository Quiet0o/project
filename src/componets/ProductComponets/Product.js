import React from "react";
import { useNavigate } from 'react-router-dom';

const Product =({props,descExits})=>{
    // console.log(props.img)
    const navigate = useNavigate();
    return(
        // {props == null ? :}
        <div key={props.id} className="product">
             <img 
                className="product-img"
                src={props.photoUrl}
                alt={props.title}
                onClick={()=>{navigate(`/product/${props.key}`)}}
             />
           <p className="product-title"> title:  {props.title}</p> 
           {descExits ? <p> description:  {props.description}</p>:<></>}
           <p className="produc-price"> price:  {props.price} zł</p>
           
        </div>
    )
}
export default Product;