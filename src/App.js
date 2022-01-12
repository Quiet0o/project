import "./App.css";
import ErrorPage from "./componets/Page/ErrorPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "./componets/Page/ProductComponets/SingleProduct";
import LandingPage from "./componets/Page/LandingPage/LandingPage";
import NavBarComponet from "./componets/Page/NavBarComponet/NavBarComponet";
import CheckAdminLogin from "./componets/Admin/CheckAdminLogin";
import { useState, useEffect } from "react";
import ItemsInCart from "./componets/Page/ProductComponets/ItemsInCart";
import { CartContext } from "./Context/CartContext";

function App() {

  const [CartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      setCartItems(JSON.parse(localStorage.getItem("cart")));
    }    
  }, []);

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
        Nie posiadamy akcyzy na alkohol, poniewarz piwo to nie alkohol 🍻 CHujejdsfjkdsf
      </footer>
    </div>
  );
}

export default App;
