import React,{useState,useRef}from 'react'
import { db,storage } from '../config/firebase-config';
import { collection, addDoc,Timestamp  } from "firebase/firestore"; 
import { ref,uploadBytes,getDownloadURL,uploadBytesResumable,} from "firebase/storage";
import { ProgressBar,Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineCloseCircle} from "react-icons/ai"
const AddProducts=()=>{
    const  [file,setFile]= useState(null)
    const [show,setShow]=useState(false)
    const [showProgress,setShowProgress]=useState(false)
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    let progressbar=0;
    const refFile = useRef();
    const [progress ,setProgress] = useState(0)
    const [quantity ,setQuantity] = useState(0)
    const [brand ,setBrand] = useState("")
    const [type ,setType] = useState("")

    const HandleAddingProducts=(event)=>{
        event.preventDefault();
        if (file != null) {
            console.log(file.name)
            
            const storageRef = ref(storage,`images/product_images/${file.name}`);
            const uploadURL = uploadBytesResumable(storageRef, file);

            uploadURL.on('state_changed', 
            (snapshot) => {
                
                progressbar = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setShowProgress(!showProgress)
                setProgress(progressbar)
                console.log('Upload is ' + Math.floor(progress) + '% done');
                
            })

            uploadBytes(storageRef,file).then((snapshot)=>{
                console.log("uploaded");
            }).then(()=>{
                    getDownloadURL(uploadURL.snapshot.ref).then((downloadURL)=>{
                    CreateProduct(downloadURL);
                })
            })
            
        }
    }
    
    const ResetFileInput =()=>{
        refFile.current.value ="";
    }

    function CreateProduct (photoUrl){
        const formData = {
            title: title,
            price: parseFloat(price),
            description: description,
            photoUrl: photoUrl,
            quantity:parseInt(quantity),
            brand: brand,
            type: type,
            timestamp:Timestamp.now()
        }
       console.log({formData});
       addDoc(collection(db,"Products"),formData).then(()=>{
            setShow(!show)
            setShowProgress(!!showProgress)
            setTitle("")
            setDescription("")
            setPrice("")
            ResetFileInput()
            setProgress(0)
       })
    }
    return(
        <div className="Add-Product">
        <Alert show={show} variant="success">
            <Alert.Heading>
                Success addded Product
            <AiOutlineCloseCircle
                onClick={()=>{setShow(!show)}}
                className="admin-close-alert-icon"
            />
            </Alert.Heading>    
        </Alert>
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
                    ref={refFile}
                    id="photoUrl"
                    name="photoUrl"
                    type="file"
                    accept=".jpeg,.gif,.png,.jpg" 
                    onChange={(e)=>setFile(e.target.files[0])}
                    placeholder="dolacz zdj produktu"
                />
                <br />
                
                <input 
                    value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}
                    type="number" 
                    name="quantity"
                    id="quantity"
                    placeholder="podaj opis produktu"
                    required
                />
                <br/>
                <label for="brand">Choose a brand:</label>
        
                <br />
                
                <center>
                    {showProgress ?<ProgressBar variant="success" striped animated now={progress} style={{width:"10vw"}} /> :<></> }
                </center>

                <br/>
                <input 
                    type="submit"
                />
            </form>
        </div>
        
    )
}
export default AddProducts;