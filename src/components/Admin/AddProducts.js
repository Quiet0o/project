import React,{useState,useRef, useContext}from 'react'
import { db,storage } from '../config/firebase-config';
import { collection, addDoc,Timestamp  } from "firebase/firestore"; 
import { ref,uploadBytes,getDownloadURL,uploadBytesResumable,} from "firebase/storage";
import { ProgressBar,Alert, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineCloseCircle} from "react-icons/ai"
import AdminSideBar from './AdminSideBar';
import ErrorPage from '../Page/ErrorPage';
import { AdminContext } from '../../Context/AdminContext';
const AddProducts=()=>{


    const {isAdmin} = useContext(AdminContext)

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
    // const [brand ,setBrand] = useState("test")
    // const [type ,setType] = useState("tesst")

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
        // console.log(formData);
        const formData = {
            title: title,
            price: parseFloat(price),
            description: description,
            photoUrl: photoUrl,
            quantity:parseInt(quantity),
            timestamp:Timestamp.now()
        }
       console.log({formData});
       addDoc(collection(db,"Products"),formData).then(()=>{

            setShow(!show)
            setShowProgress(!!showProgress)       
            setProgress(0)
            
       })
    }
    return(
        <div className="Add-Product">
          
       { isAdmin?<><AdminSideBar/>
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
          <Container>
            <Form  onSubmit={(e)=>{HandleAddingProducts(e)}}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Title..."
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    required
                  />
                  <label for="floatingInput">
                    <Form.Text className="text-muted">Title</Form.Text>
                  </label>
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>

                <div class="form-floating">
                  <input
                    type="number"
                    step="0.01" 
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e)=>setPrice(e.target.value)}
                    required
                  />
                  <label for="floatingPassword">
                    <Form.Text className="text-muted">Price</Form.Text>
                  </label>
                </div>

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>description</Form.Label>
                <Form.Control
                    id ="floatingPassword"
                    as="textarea"
                    placeholder="Leave a description here"
                    style={{ height: '100px' }}
                    onChange={(e)=>setDescription(e.target.value)}
                    />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>dolacz zdj produktu</Form.Label>

                  <input
                    ref={refFile}
                    type="file" 
                    step="0.01" 
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e)=>setFile(e.target.files[0])}
                    required
                  />
                 
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>enter quantity</Form.Label>

                <div class="form-floating">
                  <input
                    ref={refFile}
                    type="number" 
                    name="quantity"
                    id="quantity"
                    step="1" 
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e)=>setQuantity(e.target.value)}
                    required
                  />
                  <label for="floatingPassword">
                    <Form.Text className="text-muted">enter quantity</Form.Text>
                  </label>
                </div>

              </Form.Group>
              <Button
                type="submit"
              >
                Create
              </Button>
            </Form>
          </Container></>:<ErrorPage/>}
        </div>
        
    )
}
export default AddProducts;