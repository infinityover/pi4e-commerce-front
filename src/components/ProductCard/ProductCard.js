import React, { useState, useEffect, Component } from 'react';
import './ProductCard.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { Box, Image, Badge, Link } from '@chakra-ui/core';

const productFiller = 'https://www.pngitem.com/pimgs/m/84-849583_cardboard-box-png-box-png-transparent-png.png';

class ProductCard extends Component {
  render (){
    console.log(this.props)
    return(
      <>
      <Link href={'/product/?id='+this.props.property.id}>
      <Box maxW="sm" borderWidth="1px" rounded="lg" >
        <Image src={this.props.property.links ? this.props.property.links[0].imageFullPath : productFiller} alt="Imagem do produto" maxHeight='170px' />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="teal">
              Novo
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              fontColor="black"
              textTransform="uppercase"
              ml="2"
            >
              {this.props.property.quantity} em estoque
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            fontColor="black"
            lineHeight="tight"
          >
            {this.props.property.name}
          </Box>

          <Box 
            as="h6">
            R$ 
            {this.props.property.price}
          </Box>
        </Box>
      </Box>
      </Link>
    </>
  )
  }
}

export default ProductCard;
