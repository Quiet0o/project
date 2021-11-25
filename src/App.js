import './App.css';
// import SingIn from './componets/SignIn';
// import UserSingOut from './componets/UserSingOut'
// import Register from './componets/Register';
// import{useAuthState} from 'react-firebase-hooks/auth';
// import {useCollectionData} from 'react-firebase-hooks/firestore';
// import auth from './componets/confing/firebase';

import AddProducts from './componets/AdminPage/AddProducts'

function App() {
  return (
    <div className="App">
      
      <AddProducts/>

      <footer>Nie posiadamy akcyzy na alkohol, poniewarz piwo to nie alkohol 🍻</footer>
    </div>
  );
}

export default App;
