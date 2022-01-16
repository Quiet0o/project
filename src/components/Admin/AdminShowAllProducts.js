import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { Container} from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { AdminContext } from "../../Context/AdminContext";
import { db } from "../config/firebase-config";
import ErrorPage from "../Page/ErrorPage";
import AdminSideBar from "./AdminSideBar";


const AdminShowAllProducts = () => {

  const {isAdmin} = useContext(AdminContext)
  const [products, setproducts] = useState([]);
  const [productsToDelete, setproductsToDelete] = useState([]);
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
    
    console.log(product_key,product_photoUrl);

    await deleteDoc(doc(db, "Products",product_key)).then(
      DeleteImage(product_photoUrl)
    );
  }
  const DeleteImage = async(key)=>{
    const desertRef = ref(storage, key);
    deleteObject(desertRef).then(() => {
        alert("Image deleted")
      }).catch((error) => {
       alert("Error deleting image",error)
      });
    
  }
  
  const DeleteMultipleProducts = (key)=>{
      
  }

  return (
      
    <div className="admin-page-all-products">
      {isAdmin?<><AdminSideBar/>
      <Container>
        <div class="table-wrap">
          <table class="table table-responsive table-borderless">
            <thead>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>&nbsp;</th>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr class="align-middle alert border-bottom" role="alert">
                  <td>
                    <input type="checkbox" id="check" onClick={(e)=>{console.log(product.key)}}/>
                  </td>
                  <td class="text-center">
                    <img
                      class="pic"
                      height="120px"
                      src={product.photoUrl}
                      alt=""
                    />
                  </td>
                  <td>
                    <div>
                      <p class="m-0 fw-bold">{product.title}</p>
               
                    </div>
                  </td>
                  <td>
                    <div class="fw-600">{product.price} zł</div>
                  </td>
                  <td class="d-">
                  <div class="fw-600">{product.quantity}</div> 
                  </td>
                  
                  <td>
                    <div class="btn" data-bs-dismiss="alert">
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
