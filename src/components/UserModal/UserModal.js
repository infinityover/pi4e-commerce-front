import React, { useState, useEffect } from 'react';
import './UserModal.css';
import { Get, Post, Put, Delete } from '../../services/HttpService';
import Modal from 'react-bootstrap/Modal'
import { Select } from '@chakra-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function UserModal(props) {

  useEffect(() => {
    setShow(props.show);
    setData(props.item);

  },[])

  const [show, setShow] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');

  
  const modules = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = () => {
    props.setShow(false);
    setClearData();
  }


  const setClearData = () =>{
    setId("");
    setName("");
    setPassword("");
    setUserType("");
  }

  const setData = async (item) => {
    console.log(item)
    setId(item.id);
    setName(item.nome);
    setEmail(item.email);
    setPassword(item.password);
    setUserType(item.type);
  }



  async function handleSubmit(e){
    e.preventDefault();
    let product;
    if(!id) {
      product = await Post("users",{
        email,
        password,
        name,
        userType,
      }, { headers: { Authorization: `Bearer ${modules.user.auth}` } });
      await setId(product.data.data.productId);
    }else{
      await Put("users/"+id,{
        email,
        password,
        name,
        userType,
      }, { headers: { Authorization: `Bearer ${modules.user.auth}` } });    
    }
    handleClose();
  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closebutton="true">
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-form">
            <input hidden value={id} onChange={e => setId(e.target.value)}/>
            <label>Email:</label><input type="text" className="form-control" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} readOnly={(id)? true : false} required/>
            <label>Senha:</label><input type="password" className="form-control" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
            <label>Nome:</label><input type="text" className="form-control" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>
            <label>Tipo de Usuario:</label>
            <Select placeholder="Tipo de Usuario" value={userType} onChange={e => setUserType(e.target.value)} required>
              <option value="Administrator">Administrador</option>
              <option value="Stock">Estoquista</option>
            </Select>
          </div>
      </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={handleClose}>Cancelar</button>
          <button type="button" className="btn btn-success" onClick={handleSubmit}>Salvar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserModal;
