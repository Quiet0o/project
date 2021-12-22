import React, { useState } from 'react'
import ShowProducts from "../ProductComponets/ShowProducts"
import AddProducts from "../ProductComponets/AddProducts"
import {Button} from 'react-bootstrap'
import {createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { user } from '../../SignInComponet/SignInComponet'
import { auth } from '../confing/firebase-config';
const AdminPage =()=>{
    const [visible,setVisible] = useState(user)
    const [registerEmail,setRegisterEmail]=useState("")
    const [registerPassword,setRegisterPassword]=useState("")
    
    const ShowAddProduct =()=>{
        setVisible(!visible)
    }

    const Register= async ()=>{
        try{
          const user=await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
          console.log(user);
        }
        catch(err){
          console.log(err.message);
        }
      }
    const LogOut = async () => {
        await signOut(auth);
    };
    return (
        <div className="admin-page">
            {visible?<></>:<div className="new-admin">
                <h1>Sign in new admin</h1>
    
                <input type="email" placeholder="email..." onChange={(e)=>{setRegisterEmail(e.target.value)}}/><br/>
                <input type="text" placeholder="email..."onChange={(e)=>{setRegisterPassword(e.target.value)}}/><br/>
                <button placeholder="wyslij" value="dupa" onClick={()=>{Register()}}>Register</button>
                <button
                    onClick={() => {
                    LogOut();
                    }}
                >
                    Sign out
                </button>
                </div>}
            {visible? <></>: <Button onClick={ShowAddProduct}>Add Product</Button>}
            {visible ? <AddProducts/> :<></>}
            <ShowProducts/>
        </div>
    )
}
export default AdminPage;