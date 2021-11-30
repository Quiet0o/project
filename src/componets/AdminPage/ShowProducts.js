import React,{useEffect,useState}from 'react'
import { db } from '../confing/firebase-config';
import  { getDocs,collection }  from "firebase/firestore"; 
import Product from './Product';

const ShowProducts=()=>{
    const [products, setproducts] = useState([])
    const ShowAllProducts= async ()=>{
        const getProducts =[];

        const docRef = collection(db, "Products");
        let docSnap = await getDocs(docRef);
        docSnap.forEach((doc)=>{
            getProducts.push({
                key: doc.id,
                ...doc.data()
            })
            setproducts([...getProducts])
        });
        console.log(getProducts)

    }
    useEffect(()=>{
        ShowAllProducts()
       
    },[])
   
    return (
        <div className="all-product" >
            { products && products.length>0 &&
            products.map((product)=> 
            <Product props={product} key={product.id}/>)}
        
        </div>
    )
}
export default ShowProducts