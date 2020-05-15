import React, { useState, useEffect } from 'react';
import './orderModal.css';
import Modal from 'react-bootstrap/Modal'
import {Divider} from '@chakra-ui/core';


const OrderModal = (props) =>  {

  useEffect(() => {
    setShow(props.show);
    console.log(props.ele);
  },[])


  const productFiller = 'https://www.pngitem.com/pimgs/m/84-849583_cardboard-box-png-box-png-transparent-png.png';

  const [show, setShow] = useState(false);

  
  const handleClose = () => {
    props.setShow(false);
  }
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="modal-form-order">
            <label>ID: {props.ele.id}</label>
            <label>Forma de pagamento: {props.ele.paymentMethodDescription}</label>
            <label>Status do pedido: {props.ele.paymentStatusDescription}</label>
            <Divider />
            <label>Endereço de entrega: {props.ele.shippingAddress.address.complete}</label>
            <Divider />
            {
              props.ele.products.map(ele => {

                return(<div className="product-line" key={ele.id}>
                <img src={ele.product.links[0] ? ele.product.links[0].imageFullPath : productFiller} className='product-image' alt="Imagem do produto"/>
                <p>{ele.name}</p>
                Quantidade: {ele.quantity}
                <p>Preço: R$ {ele.paidValue}</p>
                <p>Subtotal:  R$ {ele.paidValue * ele.quantity}</p>
             </div>)


              })
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OrderModal;
