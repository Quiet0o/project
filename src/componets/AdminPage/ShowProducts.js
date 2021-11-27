import React,{useEffect,useState}from 'react'
import { db } from '../confing/firebase-config';
import  { getDocs,collection }  from "firebase/firestore"; 

const ShowProducts=()=>{
    const [products, setproducts] = useState([])
    useEffect(()=>{
        ShowAllProducts()
       
    },[])
    const ShowAllProducts= async (props)=>{
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
            setproducts(getProducts)
        });
        console.log(getProducts)

    }
    return (
        <div className="">
            {/* <button className="btn btn-" onClick={ShowAllProducts}>click</button> */}
            {products.map((product)=> <div key={product.id}>
                {product.title} <br/>
                {product.description} <br/>
                {product.price}<br/>
                <img with="100px" height="100px" src={product.photoUrl}/>
            </div>)}
        
        </div>
    )
}
export default ShowProducts
