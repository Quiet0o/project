import React from 'react'
import { Button } from 'react-bootstrap';
const AddBrand = ()=>{
    const AddBrandToDataBase=()=>{
        console.log("uploaded");
    }
    return(
        <div className="adding-new-brand">
            <h1>Please type name of brand</h1>
            <input type="text" placeholder="brand name" required/>
            <br/>
            <Button onClick={(e)=>{AddBrandToDataBase()}}>Add Brand</Button>
            <input type="submit" placeholder="ddd"/>
        </div>
    )
}
export default AddBrand