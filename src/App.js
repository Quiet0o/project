import './App.css';
import { useState } from 'react';
function App() {

  const [clickedButton, setclickedButton] = useState(false);
  
  return (
    <div className="App">
      <h1>Dupa</h1>
      <button onClick={()=>setclickedButton(!clickedButton)} >{clickedButton.toString()}</button>
    </div>
  );
}

export default App;
