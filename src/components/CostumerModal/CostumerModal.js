import React, { useState, useEffect, useRef } from 'react';
import './CostumerModal.css';
import { Get, Post, Put, Delete, GetCep } from '../../services/HttpService';
import Modal from 'react-bootstrap/Modal'
import { InputGroup, Input, Button, InputRightElement, Divider, useDisclosure, Scale, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton, SlideIn } from '@chakra-ui/core';
import MaskedInput from 'react-text-mask';
import { useSelector, useDispatch } from 'react-redux';


const CostumerModal = (props) =>  {

  useEffect(() => {
    setShow(props.show);
    if(modules.user.costumer){
      setCostumer(modules.costumer);
      setAdress(modules.address);
      setCreateAccount(true);
    }else if(modules.user.auth) setCreateAccount(true);
  },[])

  const modules = useSelector(state => state);


  console.log(modules)
  const dispatch = useDispatch();

  const [showPassword, setshowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [show, setShow] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [loading,setLoading] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const cancelRef = useRef();
  
  function logout(){
    dispatch({type: 'LOGOUT'});
    props.setShow(false)
  }

  async function handleLogin(){
    setLoading(true);
    Post('auth', {email: costumer.email, senha: costumer.password}).then(res => {
      console.log(dispatch(setUserStore(res.data.data)))
      setLoading(false);
      props.setShow(false)
    })
  }

  const handleClick = () => setshowPassword(!showPassword);

  const [ address, setAdress ] = useState({ placeName: '', number: '', complement: '', district: '', zipCode: '', city: '', state: '', country: '' });
  const [ costumer, setCostumer ] =  useState({ email:'', cpf:'', name:'', password:'', repeatPassword: '', address: address })
  
  const handleClose = () => {
    props.setShow(false);
    setClearData();
  }

  function setUserStore(body){
    if(costumer.cpf){
      return {
        type: 'LOGINCOSTUMER',
        nome: body.userInfo.name,
        userType:body.userInfo.userType,
        token: body.token,
        costumer: costumer,
        address: address
      };
    }
    return {
      type: 'LOGIN',
      nome: body.userInfo.name,
      userType:body.userInfo.userType,
      token: body.token,
    };
  }

  const getCep = (cep) =>  {
    if(cep) {
      GetCep(cep).then((res) => {
        setAdress({...address, placeName: res.data.logradouro, district: res.data.bairro, city: res.data.localidade, state: res.data.uf, country: 'Brasil'});

      })
    }
  }

  const setClearData = () =>{
    setAdress({ placeName: '', number: '', complement: '', district: '', zipCode: '', city: '', state: '', country: '' });
    setCostumer({ email:'', cpf:'', name:'', password:'', repeatPassword: '', address: address });
  }


  async function handleSubmit(e){
    e.preventDefault();

    handleClose();
  };

  function handleCreate(){
    setLoading(true);
    if(validate()){ onOpen();}
    else{
      if(modules.user.auth){
        Put('shoppers',generatePayload(), { headers: { Authorization: `Bearer ${modules.user.auth}` } }).then(

        )
      }else{
        Post('shoppers',generatePayload()).then(res => 
          Post('auth', {email: costumer.email, senha: costumer.password}).then(res =>{
            dispatch(setUserStore(res.data.data));
            setLoading(false);
          })
        ).catch(err => {
          if(err){
            console.log(err)
            setValidationError('Ocorreu um erro, verifique se já não possui cadastro com este email');
            onOpen();
            setLoading(false);
          }
        });
      }
    }
  }

  function generatePayload(){
    return {email: costumer.email,
            name: costumer.name,
            password: costumer.password,
            cpf: {
              number: costumer.cpf
            },
            address: costumer.address
          }
  }

  function validate(){
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(costumer.email)){
      setValidationError('Verifique o campo de email')
      return true;
    }else
      if(costumer.password !== costumer.repeatPassword){
        setValidationError('Verifique os campos de senha, eles não coincidem');
        return true;
      }
    
    return false;
  }
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
      {/* 
        <Modal.Header closebutton="true">
          <Modal.Title>Criar Conta</Modal.Title>
        </Modal.Header> */}
        {!createAccount &&
        <Modal.Body>
          <div className="modal-form">
            <label>Email:</label>
            <Input pr="4.5rem" type='text' placeholder="Email" value={costumer.email} onChange={e => setCostumer( {...costumer,email: e.target.value})}/>
            <label>Senha:</label>
            <InputGroup size="md">
              <Input pr="4.5rem" type={showPassword ? "text" : "password"} placeholder="Senha" value={costumer.password} onChange={e => setCostumer( {...costumer,password: e.target.value})}/>
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {showPassword ? "Ocultar" : "Ver"}
                </Button>
              </InputRightElement>
            </InputGroup>
            </div>
        </Modal.Body>
        }
        {!createAccount &&
        <Modal.Footer>
          <Button variantColor="blue" size="md" loadingText="Enviando" onClick={e => setCreateAccount(!createAccount)}>Criar conta</Button>
          <Button variantColor="green" size="md" isLoading={loading} loadingText="Enviando" onClick={e => handleLogin()}>Login</Button>
        </Modal.Footer>
        }
        {createAccount &&
        <Modal.Body>
          <div className="modal-form">
            <label>Email:</label>
            <Input pr="4.5rem" type='text' placeholder="Email" value={costumer.email} onChange={e => setCostumer( {...costumer,email: e.target.value})} required/>
            <label>CPF:</label>
            <MaskedInput mask={[/\d/, /\d/,/\d/, '.', /\d/, /\d/,/\d/, '.', /\d/, /\d/,/\d/, '-', /\d/, /\d/]} className="form-control" placeholder="CPF" value={costumer.cpf} onChange={e => setCostumer( {...costumer,cpf: e.target.value})} required/>
            <label>Nome:</label>
            <Input pr="4.5rem" type="text" placeholder="Nome" value={costumer.name} onChange={e => setCostumer( {...costumer,name: e.target.value})} required/>
            
            <label>Senha:</label>
            <InputGroup size="md">
              <Input pr="4.5rem" type={showPassword ? "text" : "password"} placeholder="Senha" value={costumer.password} onChange={e => setCostumer( {...costumer,password: e.target.value})} required/>
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {showPassword ? "Ocultar" : "Ver"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <label>Repita a senha:</label>
            <InputGroup size="md">
              <Input pr="4.5rem" type={showPassword ? "text" : "password"} placeholder="Repita a senha" value={costumer.repeatPassword} onChange={e => setCostumer( {...costumer,repeatPassword: e.target.value})} required/>
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {showPassword ? "Ocultar" : "Ver"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
          <Divider />
          <div className="modal-form address">
            <label>CEP:</label>
            <MaskedInput mask={[/\d/, /\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/,/\d/]} className="form-control" placeholder="CEP" onBlur={e=> getCep(e.target.value)} value={address.zipCode} onChange={e => setAdress( {...address,zipCode: e.target.value})} required/>
            <label>Estado:</label>
            <Input pr="4.5rem" type="text" placeholder="Nome" readOnly={address.zipCode} value={address.state} onChange={e => setAdress( {...address,state: e.target.value})} required/>
            <label>Cidade:</label>
            <Input pr="4.5rem" type="text" placeholder="Nome" readOnly={address.zipCode} value={address.city} onChange={e => setAdress( {...address,city: e.target.value})} required/>
            <label>Endereço:</label>
            <Input pr="4.5rem" type="text" placeholder="Nome" readOnly={address.zipCode} value={address.placeName} onChange={e => setAdress( {...address,placeName: e.target.value})} required/>
            <label>Numero:</label>
            <Input pr="4.5rem" type="text" placeholder="Nome" value={address.number} onChange={e => setAdress( {...address,number: e.target.value})} required/>
            <label>Complemento:</label>
            <Input pr="4.5rem" type="text" placeholder="Nome" value={address.complement} onChange={e => setAdress( {...address,complement: e.target.value})}/>
          </div>
        </Modal.Body>
        }
        {createAccount &&
        <Modal.Footer>
          <Button variantColor="red" size="md" loadingText="Enviando" onClick={handleClose}>Canelar</Button>
          <Button variantColor="green" size="md" isLoading={loading} loadingText="Enviando" onClick={e => logout()}>Logout</Button>
        </Modal.Footer>
        }
      </Modal>

      {/* You can swap the `Scale` with `SlideIn` to see a different transition */}
      <SlideIn in={isOpen}>
        {styles => (
          <AlertDialog
            leastDestructiveRef={cancelRef}
            finalFocusRef={btnRef}
            onClose={onClose}
            isOpen={true}
          >
            <AlertDialogOverlay opacity={styles.opacity} />
            <AlertDialogContent {...styles}>
              <AlertDialogHeader>Verifique os campos do cadastro</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                {validationError}
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Ok
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </SlideIn>
    </>
  );
}

export default CostumerModal;
