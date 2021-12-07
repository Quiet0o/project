import './App.css';
import AdminPage from "./componets/AdminPage/AdminPage"
import ErrorPage from "./componets/ErrorPage"
import ShowProducts from './componets/ProductComponets/ShowProducts'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import SingleProduct from './componets/ProductComponets/SingleProduct';
// import SingIn from './componets/Signin'
import Mainlogo  from "./img/logo.png"
import { AiOutlineSearch } from 'react-icons/fa';
function App() {
  return (
    
    <div className="App">
      <div id="baner">
        <div id="logo">
          <img id="logoimg"src={Mainlogo}/>
        </div>
        <div id="search">
          <input id="wyszukaj" type="button" value="" />
          <input type="text" id="wpisz" placeholder="search" />
        </div>
        <div id="kosz"></div>
        <div id="konto">Sing in</div>
      </div>
      <div id="filtr"></div>
        {/* <SingIn/> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ShowProducts/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/product/:ProductId" element={<SingleProduct/>}/>
            <Route path="*" element={<ErrorPage/>}/>       
          </Routes>
        </BrowserRouter>
        
      <footer>Nie posiadamy akcyzy na alkohol, poniewarz piwo to nie alkohol 🍻</footer>
    </div>
  );
}

export default App;
