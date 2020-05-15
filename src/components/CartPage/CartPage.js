import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './CartPage.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { useSelector, useDispatch } from 'react-redux';
import { Get, Post, GetCep } from '../../services/HttpService';
import { Select, Button, Tooltip, Input } from '@chakra-ui/core';
import MaskedInput from 'react-text-mask';
import { useHistory } from 'react-router-dom';
var currencyFormatter = require('currency-formatter');


function CartPage() {
  const modules = useSelector(state => state);
  const dispatch = useDispatch();
  const [address, setAdress] = useState('');
  const history = useHistory();
  
  const [ newAddress, setNewAddress ] = useState({ placeName: '', number: '', complement: '', district: '', zipCode: '', city: '', state: '', country: '' });
  const [ nameAddress, setNameAddress ] = useState("");
  const [ type, setType ] = useState("");
  const [ paymentMethod, setPaymentMethod ] = useState('');
  const [userAddress, setUserAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadThings()
  },[modules.user.auth]);
  

  async function loadThings(){

    if(modules.user.auth){
      const resp = await Get('shopper-address', { headers: { Authorization: `Bearer ${modules.user.auth}` } });
      setUserAddress(resp.data.data);
      
    }
  }

  async function hadleAddAddress(){
    console.log(JSON.stringify(genereateAddress()))
    const resp = await Post('shopper-address',genereateAddress() , { headers: { Authorization: `Bearer ${modules.user.auth}` } });
    
    window.location.reload()
  }

  function genereateAddress(){
    return {
      "name": nameAddress,
      "type": "Work",
      "address": newAddress
    }
  }

  async function hadleSend(){
    setLoading(true);
    const resp =  await Post('orders',createBody(), { headers: { Authorization: `Bearer ${modules.user.auth}` } });
    dispatch({type: "CLEANCART"})
    setLoading(false);
    history.push('/Orders');
  }

  function createBody(){
    const itens  = modules.cart.cart.map(ele => {
      return {productId: ele.id, qt: ele.qt}
    })
    return {
      "itens": [
        ...itens
      ],
      "shippingAddressId": address,
      "paymentMethod": paymentMethod,
      "creditCard": {
        "number": "string",
        "cvv": "string",
        "expirationDate": "2020-05-14T17:52:34.268Z"
      }
    }
  }

  function setQuantity(qt, id, stockQuantity){
    if(qt <= stockQuantity){
      dispatch({
        type: "ALTQUANTITY",
        id: id,
        qt: qt
      })

    }
  }

  
  const getCep = (cep) =>  {
    if(cep) {
      GetCep(cep).then((res) => {
        setNewAddress({...newAddress, placeName: res.data.logradouro, district: res.data.bairro, city: res.data.localidade, state: res.data.uf, country: 'Brasil'});

      })
    }
  }
  const productFiller = 'https://www.pngitem.com/pimgs/m/84-849583_cardboard-box-png-box-png-transparent-png.png';
  return (

    
    <>
    { modules.cart.cart ==0 &&
        <h2>Parece que o carrinho está vazio, vá logo enche-lo </h2>
    }
    { modules.cart.cart !=0 &&
    <>
    <div className="product-list">
      <div className="product-line">
        <h4>#</h4>
        <h4>Nome</h4>
        <h4>Quantidade</h4>
        <h4>Preço</h4>
        <h4>Total parcial</h4>
      </div>
      {modules.cart.cart.map(ele => {
        return (<div className="product-line" key={ele.id}>
            <img src={ele.links[0] ? ele.links[0].imageFullPath : productFiller} className='product-image' alt="Imagem do produto"/>
            <p>{ele.name}</p>
            <input className="product-quantity" value={ele.qt} type="number" min="0" onChange={e => { setQuantity(e.target.value, ele.id, ele.quantity)}}></input>
            <p>R$ {ele.price}</p>
            <p>R$ {ele.price * ele.qt}</p>
        </div>)
      })
      }
    </div>

    Total { currencyFormatter.format(modules.cart.cart.reduce(( acc=0, ele) => {
                  return acc+= (ele.qt * ele.price)
                },0), { code: 'BRL' })
    }
    {userAddress.length >= 1 &&
    <Select placeholder="Endereço" value={address} onChange={e => { console.log(e.target.value); setAdress(e.target.value)} } required>
      {userAddress.map(ele => {
        return(<option key={ele.id} value={ele.id}>{ele.name}</option>)
      })}
      <option value="add">Adcionar novo endereço</option>
    </Select>
    }
    <Select placeholder="Forma de pagamento" value={paymentMethod} onChange={e => { setPaymentMethod(e.target.value)} } required>
      <option value="CreditCard">Cartão de crédito</option>
      <option value="Billet">Boleto</option>
    </Select>


    { paymentMethod == "CreditCard" &&
      <>
        <label>Código do cartão: </label>
        <Input pr="4.5rem" type="text" placeholder="Código do cartão" required/>
        <label>CVV:</label>
        <Input pr="4.5rem" type="text" placeholder="CVV"required/>
        <label>Data de vencimento:</label>
        <Input pr="4.5rem" type="text" placeholder="Data de vencimento" required/>
      </>
    }
    <Tooltip label={(!modules.user.auth) ? "Faça o login primeiro": "Selecione endereço e forma de pagamento" } placement="top" bg="red.600">
      <Button variantColor="green" size="md" isLoading={loading} disabled={!modules.user.auth} loadingText="Enviando" onClick={e => hadleSend()}>Finalizar compra</Button>
    </Tooltip>


    { address == "add" &&
    <>
    <div class="new-newAddress">
      <label>Apelido do endereço:</label>
      <Input pr="4.5rem" type="text" placeholder="Apelido do endereço" value={nameAddress} onChange={e => setNameAddress( e.target.value)} required/>
      <label>CEP:</label>
      <MaskedInput mask={[/\d/, /\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/,/\d/]} className="form-control" placeholder="CEP" onBlur={e=> getCep(e.target.value)} value={newAddress.zipCode} onChange={e => setNewAddress( {...newAddress,zipCode: e.target.value})} required/>
      <label>Estado:</label>
      <Input pr="4.5rem" type="text" placeholder="Estado" readOnly={newAddress.zipCode} value={newAddress.state} onChange={e => setNewAddress( {...newAddress,state: e.target.value})} required/>
      <label>Cidade:</label>
      <Input pr="4.5rem" type="text" placeholder="Cidade" readOnly={newAddress.zipCode} value={newAddress.city} onChange={e => setNewAddress( {...newAddress,city: e.target.value})} required/>
      <label>Endereço:</label>
      <Input pr="4.5rem" type="text" placeholder="Endereço" readOnly={newAddress.zipCode} value={newAddress.placeName} onChange={e => setNewAddress( {...newAddress,placeName: e.target.value})} required/>
      <label>Numero:</label>
      <Input pr="4.5rem" type="text" placeholder="Numero" value={newAddress.number} onChange={e => setNewAddress( {...newAddress,number: e.target.value})} required/>
      <label>Complemento:</label>
      <Input pr="4.5rem" type="text" placeholder="Complemento" value={newAddress.complement} onChange={e => setNewAddress( {...newAddress,complement: e.target.value})}/>
    </div>
    <Button variantColor="green" size="md" isLoading={loading} disabled={!modules.user.auth} loadingText="Enviando" onClick={e => hadleAddAddress()}>Adicionar endereço</Button>
    </>
    }
   </> 
  }
  </>
  );
}

export default CartPage;
