import './App.css';
import { useState,useEffect } from 'react';
import SingIn from "./componets/SignIn"


function App() {

  const [clickedButton, setclickedButton] = useState(false);
  const [count, setcount] = useState(0);

  useEffect(() => {

    if(count === 10){
      console.log("dupa");
    }

  }, [count])

  return (
    <div className="App">
    
      <h1>Dupa</h1>
      <button onClick={()=>setclickedButton(!clickedButton)} >{clickedButton.toString()}</button>
      <button onClick={()=>setcount(count+1)} >{count}</button> 
      <SingIn/>
      {/* <Register/>  */}
    </div>
  );
}

export default App;
