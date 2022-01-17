import React, { useEffect, useState } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { Form } from "react-bootstrap";
// import { priceMax, priceMin } from "../ProductComponets/ShowProducts";

const SideBarComponet = () => {
  const [value1, SetValue1] = useState(0);
  const [brands ,setBrands] = useState([])
  const [types ,setTypes] = useState([])
 useEffect(() => {
    const GetAllBrands = async () => {
      const getProducts = [];
      const docRef = collection(db, "Brands");

      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          getProducts.push({
            key: doc.id,
            ...doc.data(),
          });
          setBrands([...getProducts]);
        });
      });
    };
    const GetAllTypes = async () => {
      const getProducts = [];
      const docRef = collection(db, "Types");

      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          getProducts.push({
            key: doc.id,
            ...doc.data(),
          });
          setTypes([...getProducts]);
        });
      });
    };
    GetAllBrands();
    GetAllTypes()
    console.log(brands);
  },[])
  

  return (
    <div
      className="sidebar-componet"
      style={{ float: "left", padding: "20px" }}
    >
      <Range min={0} max={100} tipFormatter={(value) => `${value}%`} />
      <Form>
        <label>Wybież marke:</label>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        {brands.map((brand) =>{
            return (<Form.Check type="checkbox" label={brand.BrandName} />)
        })}
       </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <label>Wybież Typ Piwa:</label>
          {types.map((type) =>{
           return (<Form.Check type="checkbox" label={type.TypeName} />)
        })}
        </Form.Group>
      </Form>
    </div>
  );
};
export default SideBarComponet;
