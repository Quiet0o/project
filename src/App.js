import './App.css';
import AdminPage from "./componets/AdminPage/AdminPage"
import ErrorPage from "./componets/ErrorPage"
import ShowProducts from './componets/ProductComponets/ShowProducts'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import SingleProduct from './componets/ProductComponets/SingleProduct';
// import SingIn from './componets/Signin'
function App() {
  return (
    <div className="App">
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
