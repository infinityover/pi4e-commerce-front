import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Get } from '../../services/HttpService';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import ProductCard from '../ProductCard/ProductCard'

function HomePage() {

  const [list, setList] = useState([]);
  async function loadProducts(){
    setList([]);
    const response = await Get('products');
    setList( response.data.data.itens);
  }
  const productFiller = 'https://www.pngitem.com/pimgs/m/84-849583_cardboard-box-png-box-png-transparent-png.png';



  useEffect(() => {
    loadProducts();

  },[])

  return (
    <>
    {!list.length && <Loader className="loader" type="Triangle" color="#D50A0A" height={500} width={500}/>}
    {list.length > 0 &&
      <div className="products-grid" >
        {list.map((item,index) => (
          <ProductCard property={item} key={item.id}/>
          ))
        }
    </div>
    }
  </>
  );
}

export default HomePage;
