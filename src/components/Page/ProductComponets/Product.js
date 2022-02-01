import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";

import {
  AiFillCalendar,
  AiFillEye,
  AiFillEyeInvisible,
  AiFillStar,
} from "react-icons/ai";
import { useAuth } from "../../../Context/AuthContext";
import ModalReview from "./ModalReview";

const Product = ({ props }) => {
  const navigate = useNavigate();
  const ref = useRef(0);
  const { currentUser } = useAuth();
  const { CartItems, setCartItems } = useContext(CartContext);
  const [hide, setHide] = useState(false);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  let liczba= 0;
  const addToCart = async () => {
    localStorage.setItem("cart", JSON.stringify([...CartItems, props.key]));

    setCartItems((prev) => [...prev, props.key]);
  };

  useEffect(() => {
    const GetType = async (type) => {
      let docRef = query(collection(db, "Products"), where("type", "==", type));
      const getProducts = [];
      const querySnapshot = await getDocs(docRef);

      querySnapshot.forEach((doc) => {
        if (props.key !== doc.id) {
          getProducts.push({
            key: doc.id,
            ...doc.data(),
          });
          setProducts((prev) => [...prev, ...getProducts]);
        }
      });
    };

    GetType(props.type);
    const GetBrand = async (brand) => {
      let docRef = query(
        collection(db, "Products"),
        where("brand", "==", brand)
      );
      const getProducts = [];
      const querySnapshot = await getDocs(docRef);

      querySnapshot.forEach((doc) => {
        if (props.key !== doc.id) {
          getProducts.push({
            key: doc.id,
            ...doc.data(),
          });
          setProducts((prev) => [...prev, ...getProducts]);
        }
      });
    };
    // GetBrand(props.brand);
    const GetUsersReviews = async () => {
      const getProducts = [];
      const q = query(
        collection(db, "Reviews"),
        where("productId", "==", props.key)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        getProducts.push({
          key: doc.id,
          ...doc.data(),
        });
        setReviews([...getProducts]);
      });
      console.log(getProducts);

      getProducts.map((review) => {
        console.log(review.stars);
        ref.current += review.stars
      })
    };
    GetUsersReviews();
    const getUser = async (userId) => {
      const getProducts = [];
      const q = query(collection(db, "Users"), where("UserId", "==", userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        getProducts.push({
          key: doc.id,
          ...doc.data(),
        });

        setUser(...getProducts);
      });
      
    };
    if (currentUser) {
      
      getUser(currentUser.uid);
    }
console.log(ref.current);
  }, []);
  return (
    <div className="container-fluid mt-2 mb-3">
      <div className="row no-gutters">

        <ModalReview
          show={show}
          onClose={handleClose}
          user={currentUser}
          product={props}
          userAdditionalInfo={user}
        />
        <div className="col-md-5 pr-2">
          <Card className="border-0">
            <div className="demo">
              <img
                style={{ width: "100%" }}
                src={props.photoUrl}
                alt={props.title}
              />
            </div>
          </Card>
          <div className="card mt-2 border-0">
            <h4>Reviews</h4>
            <div className="d-flex flex-row">
              <div className="stars">
                <AiFillStar fontSize="1.5em" />
                <AiFillStar fontSize="1.5em" />
                <AiFillStar fontSize="1.5em" />
                <AiFillStar fontSize="1.5em" />
                <AiFillStar fontSize="1.5em" />
              </div>
             
             {reviews.length?              <span className="ml-1 font-weight-bold">{parseFloat(ref.current/reviews.length).toFixed(2)}</span>
:  <span className="ml-1 font-weight-bold">0</span>}
            
            </div>
            {hide ? (
              <>
                <AiFillEyeInvisible
                  onClick={(e) => {
                    setHide(!hide);
                  }}
                  fontSize="2em"
                  float="right"
                />
              </>
            ) : (
              <>
                <AiFillEye
                  onClick={(e) => {
                    setHide(!hide);
                  }}
                  fontSize="2em"
                  float="right"
                />
              </>
            )}
            {hide ? (
              <>
                <div className="badges">
                  <span className="badge bg-dark ">All ({reviews.length})</span>
                  <span className="badge bg-warning">
                    <AiFillStar fontSize="1.5em" className="star" />
                    <AiFillStar fontSize="1.5em" color="black" />
                    <AiFillStar fontSize="1.5em" color="black" />
                    <AiFillStar fontSize="1.5em" color="black" />
                    <AiFillStar fontSize="1.5em" color="black" />
                  </span>
                </div>

                <div className="comment-section">
                  {reviews.map((review) => {
                    
                    return (
                      <>
                        <div
                          className="d-flex justify-content-between align-items-center"
                          key={review.key}
                        >
                          <div className="d-flex flex-row align-items-center">
                            <span className="username">
                              {review.userFirstName} {review.userLastName}
                            </span>
                          </div>
                          
                          <div className="comment-ratings">
                            {Array.from(Array(review.stars),(e,i)=>{
                              return (
                                <AiFillStar fontSize="1.5em" color="black" />
                              )
                            })}
                          </div>
                        </div>
                        <div className="date">
                          <span
                            className="text-muted"
                            style={{ marginRight: "2em" }}
                          >
                            {review.text}
                          </span>
                        </div>
                      </>
                    );
                  })}
                  {currentUser ? 
                    <Button onClick={handleShow}>Add review</Button>
                     : 
                      <Button href="/userLogin">
                      You must login in to add reviews
                    </Button>
                  }
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="col-md-7">
          <Card className="border-0">
            <div className="d-flex flex-row align-items-center">
              <div className="p-ratings">
                <AiFillStar fontSize="1.5em" />
                <AiFillStar fontSize="1.5em" />
                <AiFillStar fontSize="1.5em" />
                <AiFillStar fontSize="1.5em" />
                <AiFillStar fontSize="1.5em" />
              </div>
              {reviews.length?<span className="ml-1 font-weight-bold">{parseFloat(ref.current/reviews.length).toFixed(2)}</span>
:  <span className="ml-1 font-weight-bold">0</span>}
            </div>
            <div className="about">
              <h1 className="font-weight-bold">{props.title}</h1>
              <h3 className="font-weight-bold">{props.price} zł</h3>
            </div>
            <div className="d-flex flex-row align-items-center">
              <Button
                variant="outline-warning"
                style={{ color: "black" }}
                onClick={() => addToCart()}
              >
                Add Product to cart
              </Button>

              <Button variant={"warning"} style={{ color: "black" }}>
                Buy it Now
              </Button>
            </div>
            <div className="product-description">
              <div className="d-flex flex-row align-items-center">
                <AiFillCalendar />
                <span className="ml-1">Delivery from poland, 3-5 days</span>
              </div>
              <div className="mt-2">
                <h2 className="font-weight-bold">Description</h2>
                <p>{props.description}</p>
                <div className="bullets">
                  <h6> Brand name:</h6>
                  <div className="d-flex align-items-center">
                    <span className="dot"></span>
                    <span className="bullet-text">{props.brand}</span>
                  </div>
                  <h6>Type name:</h6>
                  <div className="d-flex align-items-center">
                    <span className="dot"></span>
                    <span className="bullet-text">{props.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <div className="card mt-2 border-0">
            <h3>Similar items</h3>
            <div className="similar-products  d-flex ">
              {products.map((product) => {
                return (
                  <Card
                    className="border-0"
                    key={product.key}
                    style={{ width: "9rem", marginRight: "3px" }}
                  >
                    <Card.Img
                      alt={product.title}
                      src={product.photoUrl}
                      className="img-fluid"
                      onClick={() => {
                        navigate(`/product/${product.key}`);
                        window.location.reload();
                      }}
                    />
                    <Card.Body>
                      <h5>{product.title}</h5>
                      {/* <h5>{product.key}</h5> */}

                      <h6>{product.price}zł</h6>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
