import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Routes from './Routes';


function App() {
  return (
    <div className="app">
      <div className="not-mobile-friendly">
        <h1>Mobile development currently underway.  Please view on a larger screen size.</h1>
      </div>
      <div className="everything-else">
        <Header />
        {Routes}
        <Footer />
      </div>
    </div>
  );
}

export default App;
