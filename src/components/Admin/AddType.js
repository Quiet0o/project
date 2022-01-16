import { addDoc, collection } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import { AdminContext } from '../../Context/AdminContext';
import { db } from '../config/firebase-config';
import ErrorPage from '../Page/ErrorPage';
import AdminSideBar from './AdminSideBar';
const AddType = ()=>{

    const {isAdmin} = useContext(AdminContext)
    const [type, setType] = useState("")

    const AddTypeToDataBase= async()=>{
        await addDoc(collection(db, "Types"), {
            TypeName: type,
          }).then(()=>(
              setType("")
          ))
    }
    return(
        <div className="adding-new-brand">
           { isAdmin?<><AdminSideBar/><h1>Please type Type</h1>
            <input type="text" placeholder="type name" value={type}  onChange={(e)=>{setType(e.target.value)}} required/>
            <br/>
            <Button onClick={(e)=>{AddTypeToDataBase()}}>Add Type</Button>
           </>:<ErrorPage/>}
        </div>
    )
}
export default AddType