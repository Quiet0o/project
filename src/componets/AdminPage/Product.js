import React from "react";

const Product =({props})=>{
    return(
        <div key={props.id} className="product">
           <p> title:  {props.title}</p> 
           <p> description:  {props.description}</p>
           <p> price:  {props.price} zł</p>
            <img 
                width="100px"
                height="100px"
                src={props.photoUrl}
                alt={props.title}
             />
        </div>
    )
}
export default Product;