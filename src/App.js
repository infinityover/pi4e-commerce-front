import React from 'react';
import './App.css';
import ProductList from './components/ProductList/ProductList';
import Header from './shared/Header'


function App() {
  return (
    <div className="App">
      <Header/>
      <ProductList/>
    </div>
  );
}

export default App;
