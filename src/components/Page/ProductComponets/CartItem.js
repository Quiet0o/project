import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { CartContext } from '../../../Context/CartContext'
const CartItem = ({props}) =>{
    const {CartItems} = useContext(CartContext)
    const RemoveDataFromLocalStorage=(index)=>{
        const data = CartItems;
        
        console.log(CartItems.indexOf(index));
        // data.splice(1,CartItems.indexOf(index))
        localStorage.setItem('cart', JSON.stringify(data));
        // window.location.reload(false);
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
             <p className={`product-price-cart`}>ilosc: {props.quantity} </p>
             <Button onClick={(e)=>{RemoveDataFromLocalStorage(props.key)}}>dadada</Button>
        </div>
    )
}
export default CartItem