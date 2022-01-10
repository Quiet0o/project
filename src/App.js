import "./App.css";
import ErrorPage from "./componets/ErrorPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "./componets/ProductComponets/SingleProduct";
import LandingPage from "../src/componets/LandingPage/LandingPage";
import NavBarComponet from "./componets/NavBarComponet/NavBarComponet";
import CheckAdminLogin from "./componets/CheckAdminLogin/CheckAdminLogin";
// import ShoppingCart from "./componets/ProductComponets/AddingProductToCart";
import { useState } from "react";
import ItemsInCart from "./componets/ProductComponets/ItemsInCart";
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBarComponet />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={< CheckAdminLogin/>} />
          <Route path="/product/:ProductId" element={<SingleProduct/>} />
          <Route path="/shoppingCart" element={<ItemsInCart />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

      <footer>
        Nie posiadamy akcyzy na alkohol, poniewarz piwo to nie alkohol 🍻 CHujejdsfjkdsf
      </footer>
    </div>
  );
}

export default App;
