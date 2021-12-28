import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../confing/firebase-config'
const CreareNewAdmin =()=>{
    const [registerEmail,setRegisterEmail]=useState("")
    const [registerPassword,setRegisterPassword]=useState("")

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
        <div className="new-admin">
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
                </div>
    )
}
export default CreareNewAdmin