import React from 'react';
import './App.css';
import Header from './shared/Header'
import ProductList from './components/ProductList';


function App() {
  const claudemiro = ProductList();
  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default App;
