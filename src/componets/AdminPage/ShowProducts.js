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
            // console.log(doc.id,"=>",doc.data());
            getProducts.push({
                key: doc.id,
                ...doc.data()
            })
            // console.log(getProducts);
            setproducts([...getProducts])
        });
        console.log(getProducts)
        // console.log(products)

    }
    useEffect(()=>{
        ShowAllProducts()
       
    },[])
   
    return (
        <div className="">
            {/* <button className="btn btn-" onClick={ShowAllProducts}>click</button> */}
            {products.map((product)=> 
            <Product props={product}/>)}
        
        </div>
    )
}
export default ShowProducts