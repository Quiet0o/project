import React, { useEffect, useState } from "react";
import { db } from "../confing/firebase-config";
import { getDocs, collection} from "firebase/firestore";
import Product from "./Product";
const ShowProducts = () => {

  const [products, setproducts] = useState([]);
  const productInCart = [];
  let Cartsize = productInCart.length;

  const ShowAllProducts = async () => {
    const getProducts = [];

    const docRef = collection(db, "Products");
    let docSnap = await getDocs(docRef);
    docSnap.forEach((doc) => {
      getProducts.push({
        key: doc.id,
        ...doc.data(),
      });
      setproducts([...getProducts]);
    });
  };

  const AddingProductToCart = (props) => {
    productInCart.push(props);
    console.log(productInCart);
  };

  useEffect(() => {
    ShowAllProducts();
  }, []);

  return (
    <div className="all-product">
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
