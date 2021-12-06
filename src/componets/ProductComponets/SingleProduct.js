import React from 'react'
import  {getDoc,doc }  from "firebase/firestore"; 
import { db } from '../confing/firebase-config';

import { useParams } from 'react-router';
const SingleProduct =()=>{
    let {ProductId} = useParams();
    const getSingleProduct =[];
    
    const showOneProduct = async(docId) =>{
        const docRef = doc(db, "Products",docId);
        let docSnap = await getDoc(docRef);
        
        getSingleProduct.push({key:docSnap.id, ...docSnap.data()})

        // log.info(getSingleProduct)

        console.log(getSingleProduct)
    }
    showOneProduct(ProductId)
    return (
        <p>{ProductId}</p>
        )
}
export default SingleProduct;