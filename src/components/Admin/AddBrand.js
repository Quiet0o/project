import { addDoc, collection } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import { AdminContext } from '../../Context/AdminContext';
import { db } from '../config/firebase-config';
import ErrorPage from '../Page/ErrorPage';
import AdminSideBar from './AdminSideBar';
const AddBrand = ()=>{

    const {isAdmin} = useContext(AdminContext)
    const [brand, setBrand] = useState("")

    const AddBrandToDataBase= async()=>{
        await addDoc(collection(db, "Brands"), {
            BrandName: brand,
          }).then(()=>(
              setBrand("")
          ))
    }
    return(
        <div className="adding-new-brand">
           { isAdmin?<><AdminSideBar/><h1>Please type name of brand</h1>
            <input type="text" placeholder="brand name" value={brand}  onChange={(e)=>{setBrand(e.target.value)}} required/>
            <br/>
            <Button onClick={(e)=>{AddBrandToDataBase()}}>Add Brand</Button>
           </>:<ErrorPage/>}
        </div>
    )
}
export default AddBrand