import { addDoc, collection, onSnapshot, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { db } from "../config/firebase-config";

const AdminUpdateProduct = (props) => {
  const { show, onClose,product } = props;
  const [first, setfirst] = useState([]);
  const [brands ,setBrands] = useState([])
  const [brand ,setBrand] = useState("")
  const [types ,setTypes] = useState([])
  const [type ,setType] = useState("")
  
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
  const [text, setText] = useState("");
  const SaveReview = async (e) => {
    console.log(first);
    e.preventDefault();

  };

  return (
    <div>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Review </Modal.Title>
        </Modal.Header>
         <Form onSubmit={(e)=>{SaveReview(e)}}>
        <Modal.Body>
         
            <Form.Label htmlFor="inputPassword5">Review</Form.Label><br/>

            
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title..."
                    // value={product.key}
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
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
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
                  id="floatingPassword"
                  as="textarea"
                  placeholder="Leave a description here"
                  style={{ height: "100px" }}
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
                  type="file"
                  step="0.01"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>enter quantity</Form.Label>

                <div className="form-floating">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    step="1"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="floatingPassword">
                    <Form.Text className="text-muted">enter quantity</Form.Text>
                  </label>
                </div>
              </Form.Group>

          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
         
            
            type="submit"
          >
            Save Changes
          </Button>
        </Modal.Footer>
          </Form>
      </Modal>
    </div>
  );
};
export default AdminUpdateProduct;
