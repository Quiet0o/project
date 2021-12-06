import React, { useEffect } from 'react'
import ShowProducts from "../ProductComponets/ShowProducts"
import AddProducts from "../ProductComponets/AddProducts"
const AdminPage =()=>{
    return (
        <div className="admin-page">
            <AddProducts/>
            <ShowProducts/>
        </div>
    )
}
export default AdminPage;