import React from 'react';
import './App.css';
import ProductList from './components/ProductList/ProductList';
import HomePage from './components/HomePage/HomePage';
import AdminOptions from './components/AdminOptions/AdminOptions';
import Header from './shared/Header'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core';
import ProductPage from './components/ProductPage/ProductPage';
import { Provider } from "react-redux";
import user from './store'
import Login from './components/Login/Login';
import UserList from './components/UserList/UserList';

function App() {

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <div className="App">
          <Header/>
          <Provider store={user}>
            <Router>
              <Switch>
                <Route path="/adminProductList">
                  <ProductList/>
                </Route>
                <Route path="/login">
                  <Login/>
                </Route>
                <Route path="/admin">
                  <AdminOptions/>
                </Route>
                <Route path="/UserList">
                  <UserList/>
                </Route>
                <Route path="/product">
                <ProductPage/>
                </Route>
                <Route path="/">
                  <HomePage/>
                </Route>
              </Switch>
            </Router>
          </Provider>
        </div>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
