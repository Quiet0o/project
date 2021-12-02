import React,{useEffect,useState}from 'react'
import { db } from '../confing/firebase-config';
import  { getDocs,collection,getDoc,doc }  from "firebase/firestore/lite"; 
import Product from './Product';

const ShowProducts=()=>{
    const [products, setproducts] = useState([])
    const [singleProduct, setSingleProduct] = useState([])
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

    const showOneProduct = async(docId) =>{

        console.log(typeof docId)

        const docRef = doc(db, "Products",docId);

        const docSnap = await getDoc(docRef);
        const getSingleProduct =[];
        getSingleProduct.push({...docSnap.data()})
        setSingleProduct([...getSingleProduct])
        console.log(singleProduct);
        console.log(getSingleProduct)
    }

    useEffect(()=>{
        ShowAllProducts()
       
    },[])
   
    return (
        <div className="all-product" >
            { products && products.length>0 &&
            products.map((product)=> 
            <div className="products">
                <button onClick={(e)=>{showOneProduct(product.key)}}>Single Product values</button>
                {/* <button>{product.key}</button> */}
                <Product props={product} key={product.id}/>
            </div>
            )}
        
        </div>
    )
}
export default ShowProducts