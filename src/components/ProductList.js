import React from 'react';
import './ProductList.css';
import {Get} from '../services/HttpService';

const api = "http://api-senacsp-ecommerce.herokuapp.com/api/v1/";

function ProductList() {
  const list = Get(api,'key-words').then((resp) =>{
    console.log(resp)
  });

  console.log(list)
}

export default ProductList;
