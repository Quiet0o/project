import React, { useState, useRef, useContext, useEffect } from "react";
import { db, storage } from "../config/firebase-config";
import { collection, addDoc, Timestamp, onSnapshot } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { ProgressBar, Alert, Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import AdminSideBar from "./AdminSideBar";
import ErrorPage from "../Page/ErrorPage";
import { AdminContext } from "../../Context/AdminContext";
const AddProducts = () => {
  const { isAdmin } = useContext(AdminContext);

  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  let progressbar = 0;
  const refFile = useRef();
  const [progress, setProgress] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [brands ,setBrands] = useState([])
  const [brand ,setBrand] = useState("")
  const [types ,setTypes] = useState([])
  const [type ,setType] = useState("")
  
  // const [type ,setType] = useState("tesst")
  useEffect(() => {
    const GetAllBrands = async () => {
      const getProducts = [];
      const docRef = collection(db, "Brands");

      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          getProducts.push({
            key: doc.id,
            ...doc.data(),
          });
          setBrands([...getProducts]);
        });
      });
    };
    const GetAllTypes = async () => {
      const getProducts = [];
      const docRef = collection(db, "Types");

      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          getProducts.push({
            key: doc.id,
            ...doc.data(),
          });
          setTypes([...getProducts]);
        });
      });
    };
    GetAllBrands();
    GetAllTypes()
 
    
  },[])
  const HandleAddingProducts = (event) => {
    
    event.preventDefault();
    if (file != null) {
      console.log(file.name);

      const storageRef = ref(storage, `images/product_images/${file.name}`);
      const uploadURL = uploadBytesResumable(storageRef, file);

      uploadURL.on("state_changed", (snapshot) => {
        progressbar = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setShowProgress(!showProgress);
        setProgress(progressbar);
        console.log("Upload is " + Math.floor(progressbar) + "% done");
      });

      uploadBytes(storageRef, file)
        .then(() => {
          getDownloadURL(uploadURL.snapshot.ref).then((downloadURL) => {
            CreateProduct(downloadURL);
          });
        });
    }
  };

  const ResetFileInput = () => {
    refFile.current.value = "";
  };

  function CreateProduct(photoUrl) {

    const formData = {
      title: title,
      price: parseFloat(price),
      description: description,
      photoUrl: photoUrl,
      brand:brand,
      type:type,
      quantity: parseInt(quantity),
      timestamp: Timestamp.now().toDate()
    };

    addDoc(collection(db, "Products"), formData).then(() => {
      setShow(!show);
      setShowProgress(!!showProgress);
      setTitle("");
      setDescription("");
      setPrice("");
      ResetFileInput();
      setProgress(0);
      setQuantity("");
    });
  }
  return (
    <div className="Add-Product">
      {isAdmin ? (
        <>
          <AdminSideBar />
          <Alert show={show} variant="success">
            <Alert.Heading>
              Success addded Product
              <AiOutlineCloseCircle
                onClick={() => {
                  setShow(!show);
                }}
                className="admin-close-alert-icon"
              />
            </Alert.Heading>
          </Alert>
          <Container>
            <h2>Add Product</h2>
            <Form
              method="post"
              onSubmit={
                HandleAddingProducts
              }
            >
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <div className="form-floating mb-3">
                  <input
                    value={title}
                    type="text"
                    className="form-control"
                    placeholder="Title..."
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setType(types[0].TypeName);
                      setBrand(brands[0].BrandName)
                    }}
                    required
                  />
                  <label htmlFor="formBasicEmail">
                    <Form.Text className="text-muted">Title</Form.Text>
                  </label>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>

                <div className="form-floating">
                  <input
                    value={price}
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingPassword">
                    <Form.Text className="text-muted">Price</Form.Text>
                  </label>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>description</Form.Label>
                <Form.Control
                  value={description}
                  id="floatingPassword"
                  as="textarea"
                  placeholder="Leave a description here"
                  style={{ height: "100px" }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Select Brand</Form.Label>

                <Form.Select aria-label="Default select example"  onChange={(e) =>setBrand(e.target.value)}>
                  {brands.map((brand)=>{
                     return (
                       <option value={brand.BrandName} >{brand.BrandName}</option>
                      )  
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Select Type</Form.Label>

                <Form.Select aria-label="Default select example"  onChange={(e) =>setType(e.target.value)}>
                  {types.map((types)=>{
                     return (
                       <option value={types.TypeName} >{types.TypeName}</option>
                      )  
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>dolacz zdj produktu</Form.Label>

                <input
                  ref={refFile}
                  type="file"
                  step="0.01"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>enter quantity</Form.Label>

                <div className="form-floating">
                  <input
                    value={quantity}
                    type="number"
                    name="quantity"
                    id="quantity"
                    step="1"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingPassword">
                    <Form.Text className="text-muted">enter quantity</Form.Text>
                  </label>
                </div>
              </Form.Group>
              {showProgress ? (
                <ProgressBar
                  variant="success"
                  striped
                  animated
                  now={progress}
                />
              ) : (
                <></>
              )}
              <Button type="submit">Create</Button>
            </Form>
          </Container>
        </>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};
export default AddProducts;
