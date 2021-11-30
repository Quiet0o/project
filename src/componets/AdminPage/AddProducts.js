import React,{useState}from 'react'
import { db,storage } from '../confing/firebase-config';
import { collection, addDoc,Timestamp  } from "firebase/firestore"; 
import { ref,uploadBytes,getDownloadURL,uploadBytesResumable} from "firebase/storage";

const AddProducts=()=>{


    // let photoUrl =""
    const  [file,setFile]= useState(null)
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    
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
                    CreateProduct(downloadURL);
                })
            })
            
        }
    }
    
    function CreateProduct (photoUrl){
        const formData = {
            title: title,
            price: price,
            description: description,
            photoUrl: photoUrl,
            timestamp:Timestamp.now()
        }
       console.log({formData});
       addDoc(collection(db,"Products"),formData).then(()=>{
           window.location.reload(false);
       })

    }

    return(
        <div className="Add-Product">
          <h2>Add Product</h2>
          <form onSubmit={HandleAddingProducts}>
                <input 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    type="text" 
                    name="title"
                    id="title"
                    placeholder="podaj tutył produktu" 
                    required
                />
                <br/>

                <input 
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    type="number"
                    step="0.01" 
                    name="price"
                    id="price"
                    placeholder="podaj cene produktu"
                    required
                    />
                <br/>
                <input 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
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
            </form>
        </div>
        
    )
}
export default AddProducts;