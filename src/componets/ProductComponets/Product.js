import React from "react";

const Product =({props})=>{
    return(
        <div key={props.id} className="product">
             <img 
                className="product-img"
                src={props.photoUrl}
                alt={props.title}
             />
           <p className="product-title"> title:  {props.title}</p> 
           {/* <p> description:  {props.description}</p> */}
           <p className="produc-price"> price:  {props.price} zł</p>
           
        </div>
    )
}
export default Product;