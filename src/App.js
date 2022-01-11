import "./App.css";
import ErrorPage from "./componets/ErrorPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "./componets/ProductComponets/SingleProduct";
import LandingPage from "../src/componets/LandingPage/LandingPage";
import NavBarComponet from "./componets/NavBarComponet/NavBarComponet";
import CheckAdminLogin from "./componets/CheckAdminLogin/CheckAdminLogin";
import {useState } from "react";
import ItemsInCart from "./componets/ProductComponets/ItemsInCart";
import { CartContext } from "./Context/CartContext";

function App() {
  const [CartItems, setCartItems] = useState([]);

  return (
    <div className="App">
      <CartContext.Provider value={{ CartItems, setCartItems }}>
        <BrowserRouter>
          <NavBarComponet />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<CheckAdminLogin />} />
            <Route path="/product/:ProductId" element={<SingleProduct />} />
            <Route path="/shoppingCart" element={<ItemsInCart />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
      <footer>
        Nie posiadamy akcyzy na alkohol, poniewarz piwo to nie alkohol 🍻
      </footer>
    </div>
  );
}

export default App;
