import React, { useEffect, useState } from "react";
import { db } from "../confing/firebase-config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit} from "firebase/firestore";
import Product from "./Product";
const ShowProducts = () => {

  const [products, setproducts] = useState([]);
  const productInCart = [];
  let Cartsize = productInCart.length;
  let docRef=null;

  const ShowAllProductsSortedByTime=(whatToSort,sortBy,numberOfProductsOnPage)=>{
    docRef = query(collection(db, "Products"),
      orderBy(whatToSort,sortBy),
      limit(numberOfProductsOnPage)
    );
  }

  const ShowAllProductsSortedByPrice=(whatToSort,sortBy,character,number,numberOfProductsOnPage)=>{
    docRef = query(collection(db, "Products"),
      where(whatToSort,character,number),
      orderBy(whatToSort,sortBy), 
      limit(numberOfProductsOnPage)
    );
  }

  const ShowAllProducts = async () => {
    const getProducts = [];

    onSnapshot(docRef,(snapshot) => {
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
    // ShowAllProductsSortedByTime("timestamp","desc",12)
    ShowAllProductsSortedByPrice("price","desc","<",100,12)
    ShowAllProducts();
  }, []);
 
  return (
    <div className="all-product">
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
