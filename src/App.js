import './App.css';
import SingIn from './componets/SignIn';
import auth from './firebase'
const SingOut =()=>{
  
  const logout =()=>{
   return  auth.signOut();
  }

  return(
    <button onClick={logout}>Sing out with Google account</button>
  )
}
function App() {

  return (
    <div className="App">
    
      <h1>SUPER SKLEP</h1>
      <SingIn/>
      {/* <p>{auth.currentUser.email}</p>
      <p>{auth.currentUser.displayName}</p>
      <img src={auth.currentUser.photoURL}/> */}
      <SingOut/>
      <footer>Nie posiadamy akcyzy na alkohol, poniewarz piwo to nie alkohol 🍻</footer>
    </div>
  );
}

export default App;
