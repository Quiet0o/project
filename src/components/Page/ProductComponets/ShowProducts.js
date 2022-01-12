import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase-config";
import {collection,onSnapshot,query,orderBy,where,limit} from "firebase/firestore";
import Product from "./Product";

const ShowProducts = () => {
  
  const [products, setproducts] = useState([]);
  let docRef= query(collection(db, "Products"));;
  let docRefPrice=null;
  let priceMax=0  ;
  let priceMin=0  ;
  
  const ShowAllProductsSortedByTime=(whatToSort,sortBy,numberOfProductsOnPage)=>{
    docRef = query(collection(db, "Products"),
      orderBy(whatToSort,sortBy),
      limit(numberOfProductsOnPage)
    );
  }
  const GetMinAndMaxValues=(whatToSort,sortBy,numberOfProductsOnPage,flag)=>{
    docRefPrice = query(collection(db, "Products"),
      orderBy(whatToSort,sortBy),
      limit(numberOfProductsOnPage)
    );
    GetPrice(flag)

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
    // const docRef= query(collection(db, "Products"));

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

  const GetPrice = async (flag) => {
    const getProducts = [];

    onSnapshot(docRefPrice,(snapshot) => {
      snapshot.forEach((doc) => {
          getProducts.push({
            ...doc.data(),
          });
        })
      if (flag === true) {
        getProducts.forEach((doc)=>{priceMax =  doc.price}) 
      }
      else{
        getProducts.forEach((doc)=>{priceMin =  doc.price}) 
      }
      console.log(getProducts)
      console.log(priceMin,":", priceMax);
    })

  };

  useEffect(() => {
    
    // ShowAllProductsSortedByTime("timestamp","asc",9999)
    ShowAllProductsSortedByPrice("price","desc",">",110 )

    GetMinAndMaxValues("price","asc",1,false)
    GetMinAndMaxValues("price","desc",1,true)
    ShowAllProducts();
  }, []);
 
  return (
    <div className="all-product">
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <div className="Single-product">
            <Product props={product} key={product.id} descExits={false}/>
          
          </div>
        ))}
    </div>
  );
};
export default ShowProducts;
