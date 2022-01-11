import React, { useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { useContext } from "react";

const ItemsInCart =() =>{
    const [Todos,setTodos] = useState([]);

    const {CartItems} = useContext(CartContext)
  
    useEffect(() => {
        const getLocalStorage = () => {
        if(localStorage.getItem('cart') === null){
          localStorage.setItem('cart',JSON.stringify([]));
        }else{
          let todoFromLocal =  JSON.parse(localStorage.getItem("cart"));
          setTodos(todoFromLocal);
        }
      };
        getLocalStorage()
    }, [])
    return(
        <h1>{Todos.map(todos=>{
          console.log(todos.key);
        })}</h1>
    )
}
export default ItemsInCart