import React from 'react';
import './AdminOptions.css';
import { Image } from '@chakra-ui/core';
import person from '../../assets/personStrokeBlack.svg';
import cart from '../../assets/cart.svg'
import { connect, useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function AdminOptions(){
  

  
  const modules = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const links = [ { description: 'Gerenciamento de usuarios', path:'/UserList', img:person}, 
                  { description: 'Gerenciamento de produtos', path:'/adminProductList', img:cart},
                  { description: 'Gerenciamento de pedidos', path:'/adminOrders', img:person},]
  
  console.log(modules)
  if(!modules.user.auth || modules.user.type !== "Administrator"){
    history.push('/login')
    return(<></>)
  }else{
    return(
      <>
        <main id='admin-options-body'>
          {links.map((ele,idx) => (
            <section className='card-link' key={idx} onClick={e => history.push(ele.path)}>
              <Image src={ele.img}  maxWidth='5rem' stroke='#000'/>
              <p className='description'>{ele.description}</p>
            </section>
          ))}
        </main>
      </>
    )
  }
}

export default AdminOptions;
