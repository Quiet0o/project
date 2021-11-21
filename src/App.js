import './App.css';
import { useState } from 'react';
function App() {

  const [clickedButton, setclickedButton] = useState(false);
  const [number, setnumber] = useState(0)
  return (
    <div className="App">
      <h1>Dupa</h1>
      <button onClick={()=>setclickedButton(!clickedButton)} >{clickedButton.toString()}</button>
      <button onClick={()=>setnumber(number+1)} >{number}</button>
    </div>
  );
}

export default App;
