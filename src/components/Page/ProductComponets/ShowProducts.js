import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase-config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

import {Row,Col, Card} from 'react-bootstrap';


const ShowProducts = () => {
  const [products, setproducts] = useState([]);
  let docRef = query(collection(db, "Products"));
  let docRefPrice = null;
  let priceMax = 0;
  let priceMin = 0;
  const navigate = useNavigate();
  const ShowAllProductsSortedByTime = (
    whatToSort,
    sortBy,
    numberOfProductsOnPage
  ) => {
    docRef = query(
      collection(db, "Products"),
      orderBy(whatToSort, sortBy),
      limit(numberOfProductsOnPage)
    );
  };
  const GetMinAndMaxValues = (
    whatToSort,
    sortBy,
    numberOfProductsOnPage,
    flag
  ) => {
    docRefPrice = query(
      collection(db, "Products"),
      orderBy(whatToSort, sortBy),
      limit(numberOfProductsOnPage)
    );
    GetPrice(flag);
  };
  const ShowAllProductsSortedByPrice = (
    whatToSort,
    sortBy,
    character,
    number,
    numberOfProductsOnPage
  ) => {
    docRef = query(
      collection(db, "Products"),
      where(whatToSort, character, number),
      orderBy(whatToSort, sortBy),
      limit(numberOfProductsOnPage)
    );
  };

  const ShowAllProducts = async () => {
    const getProducts = [];

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

  const GetPrice = async (flag) => {
    const getProducts = [];

    onSnapshot(docRefPrice, (snapshot) => {
      snapshot.forEach((doc) => {
        getProducts.push({
          ...doc.data(),
        });
      });
      if (flag === true) {
        getProducts.forEach((doc) => {
          priceMax = doc.price;
        });
      } else {
        getProducts.forEach((doc) => {
          priceMin = doc.price;
        });
      }
      console.log(getProducts);
      console.log(priceMin, ":", priceMax);
    });
  };

  useEffect(() => {
    ShowAllProductsSortedByTime("timestamp", "asc", 9999);
    // ShowAllProductsSortedByPrice("price","desc",">",110 )

    GetMinAndMaxValues("price", "asc", 1, false);
    GetMinAndMaxValues("price", "desc", 1, true);
    ShowAllProducts();
    console.log(products);
  }, []);

  return (
    <div className="all-product">
<Row xs={1} sm={1} lg={2} xxl={3} className="g-4" style={{margin:"0 5em 2em 5em"}}>
  {products.map((product) => (
    <Col>
      <Card style={{}}>
        <Card.Img variant="top" src={product.photoUrl} style={{height:"50vh"}}onClick={()=>{navigate(`/product/${product.key}`)}} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text style={{fontWeight:"bold"}}>
           {product.price} zł
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
      </div>

   
  );
};
export default ShowProducts;
