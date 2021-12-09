import React, { useEffect, useState } from "react";
import { db } from "../confing/firebase-config";
import { getDocs, collection,onSnapshot,query,orderBy,where,limit, limitToLast,} from "firebase/firestore";
import Product from "./Product";
// import SideBarComponet from "../SideBarComponet/SideBarComponet";
const ShowProducts = () => {
  
  const [products, setproducts] = useState([]);
  const productInCart = [];
  let Cartsize = productInCart.length;
  let docRef=null;
  let docRefPrice=null;
  let priceMax=0  ;
  
  const ShowAllProductsSortedByTime=(whatToSort,sortBy,numberOfProductsOnPage)=>{
    docRef = query(collection(db, "Products"),
      orderBy(whatToSort,sortBy),
      limit(numberOfProductsOnPage)
    );
  }

  const GetMaxValue=(whatToSort,sortBy,numberOfProductsOnPage)=>{
    docRefPrice = query(collection(db, "Products"),
      orderBy(whatToSort,sortBy),
      limit(numberOfProductsOnPage)
    );
    // ShowAllProducts();
    GetPrice()

  }
  const GetMinValue=(whatToSort,sortBy,numberOfProductsOnPage)=>{
    docRefPrice = query(collection(db, "Products"),
      orderBy(whatToSort,sortBy),
      limit(numberOfProductsOnPage)
    );
    GetPrice()

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
        // console.log(getProducts.forEach((doc)=>{doc.price}));
      // getProducts.forEach((doc)=>{priceMax =  doc.price})
      // console.log(priceMax);
    })
  };

  const GetPrice = async () => {
    const getProducts = [];

    onSnapshot(docRefPrice,(snapshot) => {
      snapshot.forEach((doc) => {
          getProducts.push({
            key: doc.id,
            ...doc.data(),
          });
        setproducts([...getProducts]);
        })
        // console.log(getProducts.forEach((doc)=>{doc.price}));
      getProducts.forEach((doc)=>{priceMax =  doc.price})
      console.log(priceMax);
    })

  };
  // const AddingProductToCart = (props) => {
  //   productInCart.push(props);
  //   console.log(productInCart);
  // };

  useEffect(() => {
    ShowAllProductsSortedByTime("timestamp","asc",9999)
    // ShowAllProductsSortedByPrice("price","desc",">",100)
    GetMinValue("price","asc",1)
    // GetMaxValue("price","desc",1)
    ShowAllProducts();
  }, []);
 
  return (
    <div className="all-product">
      {/* <SideBarComponet/> */}
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <div className="Single-product">
            <Product props={product} key={product.id} descExits={false} />
            {/* <button onClick={() => AddingProductToCart(product)}>
              Add to cart
            </button> */}
          </div>
        ))}
    </div>
  );
};
export default ShowProducts;
