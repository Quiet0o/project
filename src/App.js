import "./App.css";
import AdminPage from "./componets/AdminPage/AdminPage";
import ErrorPage from "./componets/ErrorPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "./componets/ProductComponets/SingleProduct";
import LandingPage from "../src/componets/LandingPage/LandingPage";
import NavBarComponet from "./componets/NavBarComponet/NavBarComponet";
import CheckAdminLogin from "./componets/CheckAdminLogin/CheckAdminLogin";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBarComponet />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={< CheckAdminLogin/>} />
          <Route path="/product/:ProductId" element={<SingleProduct />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

      <footer>
        Nie posiadamy akcyzy na alkohol, poniewarz piwo to nie alkohol 🍻
      </footer>
    </div>
  );
}

export default App;
