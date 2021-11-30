import React,{useEffect,useState}from 'react'
import { db } from '../confing/firebase-config';
import  { getDocs,collection }  from "firebase/firestore"; 
import Product from './Product';
const ShowProducts=()=>{
    const [products, setproducts] = useState([])
<<<<<<< HEAD
    const getProducts =[];
    
    useEffect(()=>{
        const ShowAllProducts= async ()=>{

            const docRef = collection(db, "Products");
            let docSnap = await getDocs(docRef);
            docSnap.forEach((doc)=>{
                // console.log(doc.id,"=>",doc.data());
                getProducts.push({
                    key: doc.id,
                    ...doc.data()
                })
                // console.log(getProducts);
                setproducts(getProducts)
            });
            console.log(getProducts)
        }    
        ShowAllProducts()
        return(
            <div>
                {getProducts.map((product)=> <div key={product.id}>
                {product.title} <br/>
                {product.description} <br/>
                {product.price}<br/>
                <img with="100px" height="100px" src={product.photoUrl}/>
            </div>)
                }
            </div>
        )
=======
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
       
>>>>>>> ec0cc4d029510387844d19cfd58972659f7dbbeb
    },[])
   
    return (
        <div className="">
            {/* <button className="btn btn-" onClick={ShowAllProducts}>click</button> */}
<<<<<<< HEAD
            {/* {products.map((product)=> <div key={product.id}>
                {product.title} <br/>
                {product.description} <br/>
                {product.price}<br/>
                <img with="100px" height="100px" src={product.photoUrl}/>
            </div>)} */}
            {/* <ShowAllProducts/> */}
            {useEffect()}
=======
            {products.map((product)=> 
            <Product props={product}/>)}
        
>>>>>>> ec0cc4d029510387844d19cfd58972659f7dbbeb
        </div>
    )
}
export default ShowProducts