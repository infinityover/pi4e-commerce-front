import React, { useState, useEffect, useRef } from 'react';
import './UserList.css';
import { Get, Delete } from '../../services/HttpService';
import Loader from 'react-loader-spinner';
import UserModal from '../UserModal/UserModal';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, AlertDialogOverlay } from '@chakra-ui/core';



function UserList() {

  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [altQtd, setAltQtd] = useState(false);
  const [product, setProduct] = useState({});
  const [itemToDelete, setItemToDelete] = useState('');
  const modules = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  async function loadProducts(){
    setList([]);
    const response = await Get('users', { headers: { Authorization: `Bearer ${modules.auth}` } });
    setList( response.data.data.itens.filter(item => (!item.active) ? false : true));
  }


  const handleShow = (item, alt = null) => {
    if (alt){
      setAltQtd(true);
    } 
    if(item){
      console.log(item)
      setProduct(item);
    }
    setShow(true);
  }

  async function deleteProductHandle(prodId){
    setIsOpen(true);
    setItemToDelete(prodId)
  }

  async function deleteHandle(){
    await Delete('users/'+itemToDelete, { headers: { Authorization: `Bearer ${modules.auth}` } });
    loadProducts();
    setIsOpen(false);
  }
  function setShowHandler(state){
    setShow(state);
    if(!state){
      loadProducts();
    }
  }

  useEffect(() => {
    if(!modules.auth) history.push('/login')
    loadProducts();

  },[])

  return (
    <>
    
    {show && <UserModal show={show} setShow={setShowHandler} item={product}/>} 
    {list.length > 0 &&
      <div className="table-products" >
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Tipo</th>
            <th>Comandos</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item,index) => (
            <tr key={index}>
              <th scope="row">{item.nome}</th>
              <td>{item.email}</td>
              <td>{item.type}</td>
              <td className='column-command'>
                <button className="btn btn-primary" type="submit" onClick={e => handleShow(item)}>Editar</button>
                <button type="button" className="btn btn-danger" onClick={e => deleteProductHandle(item.id)}>Excluir</button>
              </td>
            </tr>
            ))
          }
        </tbody>
      </table>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
    <AlertDialogOverlay />
    <AlertDialogContent>
      <AlertDialogHeader fontSize="lg" fontWeight="bold">
        Deletar Usuário
      </AlertDialogHeader>

      <AlertDialogBody>
        Você tem certeza que deseja deletar este Usuário
      </AlertDialogBody>

      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={onClose}>
          Cancelar
        </Button>
        <Button variantColor="red" onClick={deleteHandle} ml={3}>
          Deletar
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
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

export default UserList;
