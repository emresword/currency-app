import { useState } from 'react';
import './App.css';
import Currency from './components/Currency';
import Navi from './components/Navi';

function App() {
  return (
    <div className="app-container">
      <div className="navi">
        <Navi />
      </div>
      <div className="content">
        <Currency />
      </div>
    </div>
  );
}

export default App;
