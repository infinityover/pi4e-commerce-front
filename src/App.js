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
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './store'
import Login from './components/Login/Login';
import UserList from './components/UserList/UserList';
import OrderList from './components/OrderList/OrderList';
import AdminOrderList from './components/AdminOrderList/AdminOrderList';
import CartPage from './components/CartPage/CartPage';

function App() {
  

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <div className="App">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Header/>
            <Router>
              <Switch>
                <Route path="/adminProductList">
                  <ProductList/>
                </Route>
                <Route path="/adminOrders">
                  <AdminOrderList/>
                </Route>
                <Route path="/Orders">
                  <OrderList/>
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
                <Route path="/cart">
                <CartPage/>
                </Route>
                <Route path="/">
                  <HomePage/>
                </Route>
              </Switch>
            </Router>
            </PersistGate>
          </Provider>
        </div>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
