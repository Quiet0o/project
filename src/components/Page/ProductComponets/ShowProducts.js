import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../config/firebase-config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { Row, Col, Card, Container } from "react-bootstrap";
import { SearchBarContext } from "../../../Context/SearchBarContext";

const ShowProducts = () => {
  const [products, setproducts] = useState([]);
  let docRef = query(collection(db, "Products"));
  let docRefPrice = null;
  let priceMax = 0;
  let priceMin = 0;
  const navigate = useNavigate();
  const { search, setSearch } = useContext(SearchBarContext);
  let search_query = "";
  // const ref = useRef("");

  useEffect(() => {
    console.log(search);
    // docRef = query(collection(db, "Products"),where("title","==",search));
  }, [search]);

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

  
      
      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((doc) => {
        getProducts.push({
          key: doc.id,
          ...doc.data(),
        });

        setproducts([...getProducts]);
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
    });
  };

  useEffect(() => {
    // ShowAllProductsSortedByTime("timestamp", "asc", 9999);
    // ShowAllProductsSortedByPrice("price","desc",">",110 )
    GetMinAndMaxValues("price", "asc", 1, false);
    GetMinAndMaxValues("price", "desc", 1, true);
    ShowAllProducts();
    
  }, []);

  return (
    <div className="all-product">

      <Container>
        <Row xs={1} sm={2} lg={3} xxl={3} className="g-4">
          {products.map((product) => (
            <Col key={product.key}>
              <Card className="All">
                <Card.Img
                  variant="top"
                  src={product.photoUrl}
                  style={{ height: "40vh" }}
                  onClick={() => {
                    navigate(`/product/${product.key}`);
                  }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    {product.price} zł
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default ShowProducts;
