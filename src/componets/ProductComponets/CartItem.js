import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { CartContext } from '../../Context/CartContext'
const CartItem = ({props}) =>{
    const {CartItems, setCartItems} = useContext(CartContext)
    return (
        <div className="cart-single-product">
            <h1 className="cart-single-product-title">{props.title}</h1>
            <img 
                className={`product-img-cart`}
                src={props.photoUrl}
                alt={props.title}
               
            />
             <p className={`product-price-cart`}>{props.price} zł</p>
             <Button onClick={(e)=>{console.log("usun product")}}>dadada</Button>
        </div>
    )
}
export default CartItem