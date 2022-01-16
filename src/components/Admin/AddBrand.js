import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { AdminContext } from '../../Context/AdminContext';
import ErrorPage from '../Page/ErrorPage';
const AddBrand = ()=>{

    const {isAdmin} = useContext(AdminContext)


    const AddBrandToDataBase=()=>{
        console.log("uploaded");
    }
    return(
        <div className="adding-new-brand">
           { isAdmin?<><h1>Please type name of brand</h1>
            <input type="text" placeholder="brand name" required/>
            <br/>
            <Button onClick={(e)=>{AddBrandToDataBase()}}>Add Brand</Button>
            <input type="submit" placeholder="ddd"/></>:<ErrorPage/>}
        </div>
    )
}
export default AddBrand