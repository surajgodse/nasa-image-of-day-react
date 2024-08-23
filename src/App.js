import React from 'react';
import SpaceImage from './components/SpaceImage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Space Image of the Day</h1>
      </header>
      <main>
        <SpaceImage />
      </main>
      <Footer />
    </div>
  );
}

export default App;