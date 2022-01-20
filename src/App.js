import "./App.css";
import ErrorPage from "./components/Page/ErrorPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "./components/Page/ProductComponets/SingleProduct";
import LandingPage from "./components/Page/LandingPage/LandingPage";
import CheckAdminLogin from "./components/Admin/CheckAdminLogin";
import { useState, useEffect } from "react";
import ItemsInCart from "./components/Page/ProductComponets/ItemsInCart";
import { CartContext } from "./Context/CartContext";
import AdminShowAllProducts from "./components/Admin/AdminShowAllProducts";
import CreateNewAdmin from "./components/Admin/CreateNewAdmin";
import AddProducts from "./components/Admin/AddProducts";
import { AdminContext } from "./Context/AdminContext";
import { SearchBarContext } from "./Context/SearchBarContext";
import { ModalContext } from "./Context/ModalContext";
import AddBrand from "./components/Admin/AddBrand";
import AddType from "./components/Admin/AddType";
import { auth } from "./components/config/firebase-config";
import User from "./components/Page/User/User";
import UserLogin from "./components/Page/User/UserLogin";
import UserSignin from "./components/Page/User/UserSignin";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./Context/UserContext";
function App() {

  const [CartItems, setCartItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      
      setCartItems(JSON.parse(localStorage.getItem("cart")));
      
    }
    if (localStorage.getItem("admin") !== null) {
      setIsAdmin(JSON.parse(localStorage.getItem("admin")));
      
    }
    console.log(user);
  }, []);
  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser);
    
  })
  return (
    <div className="App">
      <UserContext.Provider value={{user,setUser}}>
      <CartContext.Provider value={{ CartItems, setCartItems }}>
      
        <AdminContext.Provider value={{ isAdmin, setIsAdmin}}>
          <SearchBarContext.Provider value={{ search, setSearch}}>
            <ModalContext.Provider value={{ show, setShow }}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/product/:ProductId" element={<SingleProduct />} />
                  <Route path="/admin/create/type" element={<AddType />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/userLogin" element={<UserLogin />} />
                  <Route path="/userSignin" element={<UserSignin />} />
                  <Route path="/shoppingCart" element={<ItemsInCart />} />
                  <Route path="/admin" element={<CheckAdminLogin />} />
                  <Route path="/admin/products" element={<AdminShowAllProducts />} />
                  <Route path="/admin/create/newAdmin" element={<CreateNewAdmin />} />
                  <Route path="/admin/create/product" element={<AddProducts />} />
                  <Route path="/admin/create/brand" element={<AddBrand />} />
                  <Route path="/admin/create/type" element={<AddType />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </BrowserRouter>
            </ModalContext.Provider>
          </SearchBarContext.Provider>
        </AdminContext.Provider>
      </CartContext.Provider>
      </UserContext.Provider>
      <footer>
        Nie posiadamy akcyzy na alkohol, poniewarz piwo to nie alkohol 🍻
      </footer>
    </div>
  );
}

export default App;
