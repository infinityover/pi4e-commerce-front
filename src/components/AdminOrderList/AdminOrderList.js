import React, { useState, useEffect } from 'react';
import './AdminOrderList.css';
import { Get, Delete } from '../../services/HttpService';
import Loader from 'react-loader-spinner';
import ProductModal from '../ProductModal/ProductModal';



function AdminOrderList() {

  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [altQtd, setAltQtd] = useState(false);
  const [product, setProduct] = useState({});
  


  async function loadProducts(){
    setList([]);
    const response = await Get('orders');
    setList( response.data.data.itens);
  }
  const productFiller = 'https://www.pngitem.com/pimgs/m/84-849583_cardboard-box-png-box-png-transparent-png.png';


  const handleShow = (item, alt = null) => {
    if (alt){
      setAltQtd(true);
    } 
    if(item){
      setProduct(item);
    }
    setShow(true);
  }

  async function deleteProduct(prodId){
    setList([]);
    await Delete('products/'+prodId);
    loadProducts();
  }

  useEffect(() => {
    loadProducts();

  },[])

  return (
    <>
    
    {show && <ProductModal show={show} setShow={setShow}/>} 
    {list.length > 0 &&
      <div className="table-products" >
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Preço</th>
            <th scope="col">Quantidade em estoque</th>
            <th scope="col">Descrição</th>
            <th>Comandos</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item,index) => (
            <tr key={index}>
              <th><img src={item.links[0] ? item.links[0].imageFullPath : productFiller} className='product-image' alt="Imagem do produto"/></th>
              <th scope="row">{item.name}</th>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td className='column-command'>
                <button className="btn btn-primary" type="submit" onClick={e => handleShow(item)}>Editar</button>
                <button className="btn btn-primary" type="submit" onClick={e => handleShow(item, 'alt')}>Alterar Quantidade</button>
                <button type="button" className="btn btn-danger" onClick={e => deleteProduct(item.id)}>Excluir</button>
              </td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    }

     {list.length <= 0 &&
        <Loader className="loader" type="Triangle" color="#D50A0A" height={500} width={500}/>
     }

    {list.length > 0 &&
      <div className="table-footer">
        <button type="button" className="btn btn-success" onClick={e => handleShow(null)}>Adicionar</button>
      </div>
    }
  </>
  );
}

export default AdminOrderList;
