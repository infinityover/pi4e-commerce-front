import React from 'react';
import logo from '../assets/logo2.png';
import person from '../assets/person.svg';
import cart from '../assets/cart.png'
import './Header.css';

function Header() {
  return (
    <div className="App">
      <header className='site-header'>
          <a href="/"><img src={ logo }  height="125px" alt='logo'/></a>
          <input type="text" name="search" id="search-bar" className='search-bar' placeholder="Buscar"/>
          <a href="/account" className="person"><img src={ person } height="75px" alt='person'/>Minha conta</a>
          <a href="/cart" className="cart" ><img src={ cart } height="75px" alt='cart'/>R$</a>
      </header>
    </div>
  );
}

export default Header;
