import React,{useState}from 'react'
import { db,storage } from '../confing/firebase-config';
import { collection, addDoc } from "firebase/firestore"; 
import { ref,uploadBytes,getDownloadURL,uploadBytesResumable} from "firebase/storage";

const AddProducts=()=>{
    let photoUrl =""
    let status = "";
    const  [file,setFile]= useState(null)
    
    const HandleAddingProducts=(event)=>{
        event.preventDefault();
        if (file != null) {
            console.log(file.name)
            
            const storageRef = ref(storage,`images/product_images/${file.name}`);
            const uploadURL = uploadBytesResumable(storageRef, file);

            uploadBytes(storageRef,file).then((snapshot)=>{
                console.log("uploaded");
            }).then(()=>{
                    getDownloadURL(uploadURL.snapshot.ref).then((downloadURL)=>{
                    console.log(downloadURL);
                    photoUrl =  downloadURL;
                    CreateProduct(event);

                })
            })
            
        }
    }
    
    function CreateProduct (event){
        console.log(photoUrl)
        const elements = [...event.target.elements];

        const formData = elements.reduce((accumulator, currentValue)=>{
           if (currentValue.id) {
                accumulator[currentValue.id] = currentValue.value
                if (currentValue.id === "photoUrl") {
                   currentValue.src = photoUrl;
                   accumulator[currentValue.id] = currentValue.src
                }
                if (currentValue.id === accumulator[currentValue.id]) {
                    currentValue.value = null;
                }
           }
           return accumulator;
       },{})
       console.log({formData});
       addDoc(collection(db,"Products"),formData)
       setTimeout(()=>{
            window.location.reload(false);
            status="sending";
       },500);
    }

    return(
        <div className="Add-Product">
          <h2>Add Product</h2>
          <form onSubmit={HandleAddingProducts}>
                <input 
                    type="text" 
                    name="title"
                    id="title"
                    placeholder="podaj tutył produktu" 
                    required
                />
                <br/>

                <input 
                    type="number"
                    step="0.01" 
                    name="price"
                    id="price"
                    placeholder="podaj cene produktu"
                    required
                    />
                <br/>
                <input 
                    type="text" 
                    name="description"
                    id="description"
                    placeholder="podaj opis produktu"
                    required
                />
                <br/>
                <input 
                    id="photoUrl"
                    name="photoUrl"
                    type="file"
                    accpet="image"
                    onChange={(e)=>setFile(e.target.files[0])}
                    placeholder="dolacz zdj produktu"
                />
                <br/>
                <input 
                    type="submit"
                />
                <p>{status}</p>
            </form>
        </div>
        
    )
}
export default AddProducts;