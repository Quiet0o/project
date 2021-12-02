import './App.css';
import AddProducts from './componets/AdminPage/AddProducts'
import ShowProducts from './componets/AdminPage/ShowProducts'
import SingIn from './componets/Signin'
function App() {
  return (
    <div className="App">
        <SingIn/>
      <AddProducts/>
      <ShowProducts/>


      <footer>Nie posiadamy akcyzy na alkohol, poniewarz piwo to nie alkohol 🍻</footer>
    </div>
  );
}

export default App;
