import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Routes from './Routes';


function App() {
  return (
    <div className="app">
        <Header />
        {Routes}
        <Footer />
    </div>
  );
}

export default App;
