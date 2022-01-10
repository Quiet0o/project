import { doc, getDoc } from 'firebase/firestore';
import React,{useEffect, useState} from 'react'
import { db } from '../confing/firebase-config';
import { key } from './Product';

const AddingProductToCart =()=>{
    
    const products =[];
    const [productInCart,setProductInCart] = useState([]);

    useEffect(() => {
        const showOneProduct = async () => {
          const getSingleProduct = [];
    
          const docRef = doc(db, "Products", key);
    
          let docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            getSingleProduct.push({ key: docSnap.id, ...docSnap.data() });
            setProductInCart([...getSingleProduct]);
          }
          console.log(setProductInCart);
        };
    
        showOneProduct();
      }, []);
    return(
      <div className="cart">
         <h1>{key}</h1>
        <h1>Pwikoaedasdnjasjdfbfh</h1>
      </div>
       
    )
}
export default AddingProductToCart;

