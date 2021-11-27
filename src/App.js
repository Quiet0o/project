import './App.css';
import AddProducts from './componets/AdminPage/AddProducts'
import ShowProducts from './componets/AdminPage/ShowProducts'
function App() {
  return (
    <div className="App">
      
      <AddProducts/>
      <ShowProducts/>


      <footer>Nie posiadamy akcyzy na alkohol, poniewarz piwo to nie alkohol 🍻</footer>
    </div>
  );
}

export default App;
