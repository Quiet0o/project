import React, { useState } from 'react'
import ShowProducts from "../ProductComponets/ShowProducts"
import AddProducts from "../ProductComponets/AddProducts"
import {Button} from 'react-bootstrap'
const AdminPage =()=>{
    const [visible,setVisible] = useState(false)
    const ShowAddProduct =()=>{
        setVisible(!visible)
    }
    return (
        <div className="admin-page">
            {visible? <></>: <Button onClick={ShowAddProduct}>Add Product</Button>}
            {visible ? <AddProducts/> :<></>}
            <ShowProducts/>
        </div>
    )
}
export default AdminPage;