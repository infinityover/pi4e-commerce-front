import React, { useState } from 'react';
import logo from '../assets/logo2.png';
import person from '../assets/person.svg';
import cart from '../assets/cartStrokeWhite.svg'
import './Header.css';
import CostumerModal from '../components/CostumerModal/CostumerModal';

function Header() {
  
  const [show, setShow] = useState(false);
  return (
  <>
    {show && <CostumerModal show={show} setShow={setShow}/>}
    <div className="App">
      <header className='site-header'>
          <div><a href="/"><img src={ logo }  height="125px" alt='logo'/></a></div>
          <input type="text" name="search" id="search-bar" className='search-bar' placeholder="Buscar"/>
          <div className='myAccont' onClick={e => setShow(true) }><img src={ person } height="75px" alt='person'/><p>Minha conta</p></div>
          <a href="/cart" className="cart" ><img src={ cart } height="75px" alt='cart'/>R$</a>
      </header>
    </div>
    </>
  );
}

export default Header;
