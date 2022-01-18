import React from 'react'
import { auth } from '../../config/firebase-config'

const User = ()=>{
    return(
        <h1>{auth.currentUser.providerId}</h1>
    )
}

export default User