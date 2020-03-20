import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { Box, Image, Badge, Link, Button  } from '@chakra-ui/core';
import useQuery from './useQuery';
import Loader from 'react-loader-spinner'

import { Get } from '../../services/HttpService';

function ProductPage(){
  
  const query = useQuery();
  const id  = query.get("id")
  const [list, setList] = useState([]);
  const [product, setProduct] = useState({});

  const productFiller = 'https://www.pngitem.com/pimgs/m/84-849583_cardboard-box-png-box-png-transparent-png.png';


  useEffect(() => {
    loadProducts();
  },[])


  async function loadProducts(){
    setList([]);
    const response = await Get('products');
     response.data.data.itens.forEach(element => {
      if(element.id == id) setProduct(element);
    });
  }
  
  
  return(
    <>
    
    {!product.id && <Loader className="loader" type="Triangle" color="#D50A0A" height={500} width={500}/>}
    {product.id &&
      <div className='product'>
        <div className='image'>
        <Image className='image-product'
          size="500px"
          objectFit="cover"
          src={product.links ? product.links[0].imageFullPath : productFiller}
          alt="Imagem "
          />
      </div>
      <div className='products-datails'>
      <h2>{product.name}</h2>
      <h4>{product.description}</h4>
      
      <h4>R$ {product.price}</h4>
      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        borderColor="green.500"
      >
        Comprar
      </Button>
      <br/><br/><br/><br/>
      <h2>Perguntas e respostas</h2>
      { product.questionAndAnswers &&
      product.questionAndAnswers.map((item,index) => (
        <div className='QA' key={index}>
          <h4>{item.questionAndAnswer.question}</h4>
          <h4>{item.questionAndAnswer.answer}</h4>
        </div>
      ))

      }
      </div>
    </div>
  }
    </>
  )
}

export default ProductPage;
