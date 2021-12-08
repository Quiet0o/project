import React, { useEffect, useState } from "react";
import { db } from "../confing/firebase-config";
import { getDocs, collection,onSnapshot,query,orderBy,where} from "firebase/firestore";
import Product from "./Product";
const ShowProducts = () => {

  const [products, setproducts] = useState([]);
  const productInCart = [];
  let Cartsize = productInCart.length;
  let docRef=null;
  const ShowAllProductsSortedByTime=(whatToSort,sortBy)=>{
    docRef = query(collection(db, "Products"),orderBy(whatToSort,sortBy));

  }
  const ShowAllProductsSortedByPrice=(whatToSort,sortBy,character,number)=>{
    docRef = query(collection(db, "Products"),where(whatToSort,character,number),orderBy(whatToSort,sortBy));

  }
  const ShowAllProducts = async () => {
    const getProducts = [];

    const test = onSnapshot(docRef,(snapshot) => {
      snapshot.forEach((doc) => {
          getProducts.push({
            key: doc.id,
            ...doc.data(),
          });
        setproducts([...getProducts]);
        })
    })

  };

  const AddingProductToCart = (props) => {
    productInCart.push(props);
    console.log(productInCart);
  };

  useEffect(() => {
    // ShowAllProductsSortedByTime("timestamp","asc")
    ShowAllProductsSortedByPrice("price","desc",">",100)
    ShowAllProducts();
  }, []);
 
  return (
    <div className="all-product">
      {/* <> */}
      {/* <p >{Cartsize}</p> */}
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <div className="Single-product">
            <Product props={product} key={product.id} descExits={false} />
            <button onClick={() => AddingProductToCart(product)}>
              Add to cart
            </button>
          </div>
        ))}
    </div>
  );
};
export default ShowProducts;
