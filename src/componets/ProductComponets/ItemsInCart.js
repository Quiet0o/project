import React, { useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { useContext } from "react";

const ItemsInCart =() =>{
    const [ItemsInCart,setItemsInCart] = useState([]);
    const {CartItems} = useContext(CartContext)
    const {setCartItems} = useContext(CartContext)
    const [NumberOfItemsInCart, setNumberOfItemsInCart] = useState([])
    useEffect(() => {
        setNumberOfItemsInCart(CartItems)
        const getLocalStorage = () => {
          if(localStorage.getItem('cart') === null){
            localStorage.setItem('cart',JSON.stringify([]));
          } else {
            let todoFromLocal =  JSON.parse(localStorage.getItem("cart"));
          // console.log(todoFromLocal);
            setNumberOfItemsInCart([...todoFromLocal]);
          // dupa = todoFromLocal\
          }
        };
        getLocalStorage()
        console.log(NumberOfItemsInCart);
    }, [])

    const CartItemsRender=()=>{
      NumberOfItemsInCart.map((item)=>{
        return(
          <div className="dupa">
            <h1>{item.title}</h1>
          </div>
        )
      })
    }

    return(
       <div className="cart-page-main">
          
       </div>
    )
}
export default ItemsInCart