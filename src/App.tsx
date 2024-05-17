import React from 'react';
import './App.css';
import Messenger from '../src/components/Messenger/Messenger'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Remote App module - federation (CRA)
        </p>
        <Messenger/>
          {/*<WeatherWidget/>*/}
      </header>
    </div>
  );
}

export default App;
