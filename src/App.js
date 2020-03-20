import React from 'react';
import './App.css';
import ProductList from './components/ProductList/ProductList';
import ProductListMain from './components/ProductListMain/ProductListMain';
import Header from './shared/Header'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core';
import ProductPage from './components/ProductPage/ProductPage';



function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <div className="App">
          <Header/>
          <Router>
            <Switch>
              <Route path="/adminList">
                <ProductList/>
              </Route>
              
              <Route path="/product/">
              <ProductPage/>
              </Route>
              <Route path="/">
                <ProductListMain/>
              </Route>
            </Switch>
          </Router>
        </div>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
