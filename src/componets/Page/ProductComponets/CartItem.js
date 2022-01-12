import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { CartContext } from '../../../Context/CartContext'
const CartItem = ({props}) =>{
    const {CartItems, setCartItems} = useContext(CartContext)
    const RemoveDataFromLocalStorage=(index)=>{
        const data = CartItems;
        
        console.log(CartItems.indexOf(index));
        data.splice(index,1)
        localStorage.setItem('cart', JSON.stringify(data));
        window.location.reload(false);
    }
    return (
        <div className="cart-single-product">
            <h1 className="cart-single-product-title">{props.title}</h1>
            <img 
                className={`product-img-cart`}
                src={props.photoUrl}
                alt={props.title}
               
            />
             <p className={`product-price-cart`}>{props.price} zł</p>
             <Button onClick={(e)=>{console.log(CartItems);console.log(props.key);RemoveDataFromLocalStorage(props.key)}}>dadada</Button>
        </div>
    )
}
export default CartItem