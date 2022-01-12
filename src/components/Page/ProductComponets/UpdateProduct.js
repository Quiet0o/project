import { doc, updateDoc } from '@firebase/firestore';
import React from 'react'
import { useParams } from "react-router";
import { db } from '../../config/firebase-config';

const UpdateProduct =()=>{

    const { ProductId } = useParams();


    const UpdateData  = async()=>{
        const docRef = doc(db, "Products", ProductId);
        await updateDoc(docRef, {
            
        })
    }
    return(
        <button onClick={UpdateData()}>Update data</button>
    )
}
export default UpdateProduct