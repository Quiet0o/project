import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../../Context/CartContext";
import { Button, ButtonGroup, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { collection, collectionGroup, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import SwiperCore, { Pagination, Navigation } from "swiper";
import {
  AiFillCalendar,
  AiFillEye,
  AiFillEyeInvisible,
  AiFillStar,
} from "react-icons/ai";
import { MdHideSource } from "react-icons/md";
import { GrFormViewHide, GrHide } from "react-icons/gr";
import { UserContext } from "../../../Context/UserContext";

SwiperCore.use([Pagination, Navigation]);

const Product = ({ props, descExits }) => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext)
  const { CartItems, setCartItems } = useContext(CartContext);
  const [hide, setHide] = useState(false);
  const single = descExits ? "single" : "all";
  const [products, setProducts] = useState([]);

  const addToCart = async () => {
    localStorage.setItem("cart", JSON.stringify([...CartItems, props.key]));

    setCartItems((prev) => [...prev, props.key]);
  };

  useEffect(() => {
    const GetType = async (type) => {
      let docRef = query(collection(db, "Products"), where("type", "==", type));
    const getProducts = [];
        
    
    const snapRef2 = collectionGroup(db, "ProductReviews" )
    const querySnapshot = await getDocs(snapRef2);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });

      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          if (props.key !== doc.id) {
            getProducts.push({
              key: doc.id,
              ...doc.data(),
            });
            setProducts((prev) => [...prev, ...getProducts]);
          }
        });
      });

    };
    GetType(props.type);
    const GetBrand = async (brand) => {
      let docRef = query(collection(db, "Products"), where("brand", "==", brand));
    const getProducts = [];
        
    
    const snapRef2 = collectionGroup(db, "ProductReviews" )
    const querySnapshot = await getDocs(snapRef2);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });

      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          if (props.key !== doc.id) {
            getProducts.push({
              key: doc.id,
              ...doc.data(),
            });
            setProducts((prev) => [...prev, ...getProducts]);
          }
        });
      });

    };
    GetBrand(props.brand);
  }, []);
  return (
    <div className="container-fluid mt-2 mb-3">
      <div className="row no-gutters">
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

              <span className="ml-1 font-weight-bold">4.6</span>
            </div>
            {hide ?
            <>
              <AiFillEyeInvisible
                onClick={(e) => {
                    setHide(!hide);
                }}
                fontSize="2em"
                float="right"
                />
              
               
                </> 
             :<> 
              <AiFillEye
                onClick={(e) => {
                  setHide(!hide);
                }}
                fontSize="2em"
                float="right"
              />
              </>
            }
            {hide ? 
              <>
                <div className="badges">
                  <span className="badge bg-dark ">All (230)</span>
                  <span className="badge bg-dark ">
                    <i className="fa fa-image"></i> 23
                  </span>
                  <span className="badge bg-dark ">
                    <i className="fa fa-comments-o"></i> 23
                  </span>
                  <span className="badge bg-warning">
                    <AiFillStar fontSize="1.5em" color="black" />
                    <AiFillStar fontSize="1.5em" color="black" />
                    <AiFillStar fontSize="1.5em" color="black" />
                    <AiFillStar fontSize="1.5em" color="black" />
                    <AiFillStar fontSize="1.5em" color="black"/>

                    <span className="ml-1">2,123</span>
                  </span>
                </div>

                <div className="comment-section">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-row align-items-center">
                      <img
                        src="https://i.imgur.com/o5uMfKo.jpg"
                        className="rounded-circle profile-image"
                      />
                      <div className="d-flex flex-column ml-1 comment-profile">
                        <div className="comment-ratings">
                          <AiFillStar fontSize="1.5em" />
                          <AiFillStar fontSize="1.5em" />
                        </div>
                        <span className="username">Lori Benneth</span>
                      </div>
                    </div>
                    <div className="date">
                      <span
                        className="text-muted"
                        style={{ marginRight: "2em" }}
                      >
                        2 May
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-row align-items-center">
                      <img
                        src="https://i.imgur.com/tmdHXOY.jpg"
                        className="rounded-circle profile-image"
                      />
                      <div className="d-flex flex-column ml-1 comment-profile">
                        <div className="comment-ratings">
                          <AiFillStar fontSize="1.5em" />
                          <AiFillStar fontSize="1.5em" />
                          <AiFillStar fontSize="1.5em" />
                          <AiFillStar fontSize="1.5em" />
                          <AiFillStar fontSize="1.5em" />
                        </div>
                        <p>Timona Simaung</p>
                      </div>
                    </div>
                    <div className="date">
                      <span
                        className="text-muted"
                        style={{ marginRight: "2em" }}
                      >
                        12 May
                      </span>
                    </div>
                  </div>
                  {user ? <Button>Add review</Button>:<Button href="/userLogin">You must login in to add reviews</Button>}
                </div>

              </>
             : 
              <></>
            }
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
              <span className="ml-1">5.0</span>
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
