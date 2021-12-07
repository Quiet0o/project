import React,{useState} from 'react'
import  {getDoc,doc }  from "firebase/firestore"; 
import { db } from '../confing/firebase-config';
import ErrorPage from '../ErrorPage';
import { useParams } from 'react-router';
const SingleProduct =()=>{
    let {ProductId} = useParams();
    const getSingleProduct =[];
    const [err,setErr]= useState(false)
    const showOneProduct = async(docId) =>{
        const docRef = doc(db, "Products",docId);
        let docSnap = await getDoc(docRef).then(()=>{
            getSingleProduct.push({key:docSnap.id, ...docSnap.data()})
            
        }).catch(()=>{
            // <ErrorPage/>
            setErr(!err)
        });
        
        // getSingleProduct.push({key:docSnap.id, ...docSnap.data()})

        // log.info(getSingleProduct)

        console.log(getSingleProduct)
    }
    // showOneProduct(ProductId)
    return (
        <div className="">
               <p> {err.valueOf}</p>
                <p>{ProductId}</p>
            </div>
        )
}
export default SingleProduct;