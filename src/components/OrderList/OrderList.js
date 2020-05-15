import React, { useState, useEffect } from 'react';
import './OrderList.css';
import { Get, Delete } from '../../services/HttpService';
import Loader from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OrderModal from '../orderModal/orderModal';
var currencyFormatter = require('currency-formatter');



function OrderList() {
  const modules = useSelector(state => state);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const history = useHistory();
  const [list, setList] = useState([]);
  const [altQtd, setAltQtd] = useState(false);
  const [orders, setOrders] = useState([{}]);
  const [order, setOrder] = useState({});  


  async function loadOrders(){
    setList([]);
    const response = await Get('orders', { headers: { Authorization: `Bearer ${modules.user.auth}` } });
    setOrders(response.data.data.itens)
  }
  const productFiller = 'https://www.pngitem.com/pimgs/m/84-849583_cardboard-box-png-box-png-transparent-png.png';


  const handleShow = (item, alt = null) => {
    setOrder(item);
    setShow(true);
  }

  async function deleteProduct(prodId){
    setList([]);
    await Delete('products/'+prodId);
    loadOrders();
  }

  useEffect(() => {
    if(!modules.user.auth && modules.user.type != "Shopper"){
      history.push('/')
    }else{
      loadOrders();
    }

  },[])

  return (
    <>

    {show && <OrderModal show={show} setShow={setShow} ele={order}/>}
     {orders.length == 0 &&
        <Loader className="loader" type="Triangle" color="#D50A0A" height={500} width={500}/>
     }

     { orders.length > 0 &&
      <>
      <main className="page-body">
        <div className="order-list">
          <p>ID</p>
          <p>Data do Pedido</p>
          <p>Forma de pagamento</p>
          <p>Status</p>
          <p>Total</p>
        </div>
      {orders.map(ele => {
         return (
         <div className="order-list" key={ ele.id}>
         <p>{ele.id}</p>
          <p>{( new Date(ele.createdAt)).toLocaleDateString()}</p>
          <p>{ele.paymentMethodDescription}</p>
          <p>{ele.paymentStatusDescription}</p>
          <p>{currencyFormatter.format(ele.total,{ code: 'BRL' })}</p>
          <button className="btn btn-primary" type="submit" onClick={e => handleShow(ele)}>Ver Detalhes</button>
        </div>)
       })
     }
     </main>
     </>
  }
  </>
  );
}

export default OrderList;
