import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../confing/firebase-config";
import Product from "./Product";
import ErrorPage from "../ErrorPage";
import { useParams } from "react-router";

const SingleProduct = () => {
  const { ProductId } = useParams();

  const [exists, setExists] = useState(true);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const showOneProduct = async () => {
      const getSingleProduct = [];

      const docRef = doc(db, "Products", ProductId);

      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        getSingleProduct.push({ key: docSnap.id, ...docSnap.data() });
        setProducts([...getSingleProduct]);
      } else {
        setExists(false);
      }
    };

    showOneProduct();
  }, []);

  const ProductElement = () => {
    if (exists) {
      return products.map((product) => {
        return (
            <div className="product-single-page-main">
                <Product props={product} key={product.id} descExits={true} />
            </div>
        );
      });
    }

    return <ErrorPage />;
  };

  return (
    <div className="single-product-page">
        
      <ProductElement />
    </div>
  );
};
export default SingleProduct;
