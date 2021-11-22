import React from 'react'
import {useFormik} from "formik"


const Signin=()=>{

    const formik =useFormik({
        initialValues: { email: "" ,password: ""},
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <input 
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                type="email"                 
                placeholder="podaj email"
                required
               />
               <br/> 
               <input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder="podaj password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    required
               />
               <br/> 
            <button type="submit">Submit</button>
        </form>
    )
}

export default Signin;