import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Routes from './Routes';

function App() {
  return (
    <div className="app">
        <Header />
        {Routes}
    </div>
  );
}

export default App;
