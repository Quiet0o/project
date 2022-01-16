import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { Container} from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { AdminContext } from "../../Context/AdminContext";
import { ModalContext } from "../../Context/ModalContext";
import { db } from "../config/firebase-config";
import ErrorPage from "../Page/ErrorPage";
import AdminSideBar from "./AdminSideBar";
import AdminUpdateProduct from "./AdminUpdateProduct";

const AdminShowAllProducts = () => {

  const {isAdmin} = useContext(AdminContext)
  const {show,setShow} = useContext(ModalContext)
  const [products, setproducts] = useState([]);
  const [productsToDelete, setproductsToDelete] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  let i = 0;
  const storage = getStorage();
  useEffect(() => {
    const ShowAllProducts = async () => {
      const getProducts = [];
      const docRef = query(collection(db, "Products"));

      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          getProducts.push({
            key: doc.id,
            ...doc.data(),
          });
          setproducts([...getProducts]);
        });
      });
    };
    ShowAllProducts();
    console.log(products);
  }, []);

  const DeleteProduct =  async(product)=>{
    const product_key   = product.key;
    const product_photoUrl = product.photoUrl;
    console.log(product_key);
    console.log(product_key,product_photoUrl);

    await deleteDoc(doc(db, "Products",product_key)).then(
      DeleteImage(product_photoUrl)
    );
  }
  const DeleteImage = async(key)=>{
    const desertRef = ref(storage, key);
    deleteObject(desertRef).then(() => {
        // alert("Image deleted")
        
        window.location.reload(false);
      }).catch((error) => {
       alert("Error deleting image",error)
      });
  }
  

  return (
      
    <div className="admin-page-all-products">
      
      {isAdmin?<><AdminSideBar/>
      <Container>
        <div className="table-wrap">
          <table className="table table-responsive table-borderless">
            <thead>
            
             <tr> 
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="align-middle alert border-bottom" role="alert" key={product.key}>
        
                  <td className="text-center">
                    <img
                      className="pic"
                      height="120px"
                      src={product.photoUrl}
                      alt=""
                    />
                  </td>
                  <td>
                    <div>
                      <p className="m-0 fw-bold">{product.title}</p>
               
                    </div>
                  </td>
                  <td>
                    <div className="fw-600">{product.price} zł</div>
                  </td>
                  <td >
                  <div className="fw-600">{product.brand}</div> 
                  </td>
                  <td >
                  <div className="fw-600">{product.quantity}</div> 
                  </td>
                  
                  <td>
                    <div className="btn" data-bs-dismiss="alert">
                      <MdOutlinePublishedWithChanges style={{color:"green"}} onClick={() => console.log("ddd")}/>
                     
                    </div>
                  </td>
                  <td>
                    <div className="btn" data-bs-dismiss="alert">
                      <AiOutlineClose style={{color:"red"}} onClick={(e)=>{DeleteProduct(product);}}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container></>:<ErrorPage/>}
    </div>
  );
};
export default AdminShowAllProducts;
