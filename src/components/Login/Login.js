import React, {useState} from 'react';
import './Login.css';
import { FormControl, FormLabel, Input, FormHelperText, Button} from '@chakra-ui/core';
import person from '../../assets/personStrokeBlack.svg';
import cart from '../../assets/cart.svg'
import { useSelector, useDispatch } from 'react-redux';
import { Post } from '../../services/HttpService';
import { useHistory } from "react-router-dom";


const Login = () => {

  const history = useHistory();
  const modules = useSelector(state => state);
  const dispatch = useDispatch();

  const [loading,setLoading] = useState(false);
  const [login,setLogin] = useState({login: '', password: ''});

  //{user:body.nome,type:body.userType,auth:body.token}
  function setUserStore(body){
    return {
      type: 'LOGIN',
      nome: body.userInfo.name,
      userType:body.userInfo.userType,
      token: body.token,
    };
  }

  async function getLogin(){
      const response  =  await Post('auth', {email: login.login, senha:login.password});
      console.log( dispatch(setUserStore(response.data.data)));
    }

  async function handleSend(){
    setLoading(true);
    await getLogin();
    setLoading(false)
  }
    return(
    <>
    {!modules || !modules.auth &&
      <div className='login-page-body'>
        <FormControl className='login-page-form'>
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <Input type="email" id="email" aria-describedby="E-mail" value={login.login} onChange={e => setLogin( {...login,login: e.target.value})}/>
          <FormHelperText id="email-helper-text">
            E-mail de login
          </FormHelperText>
          
          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input type="password" id="password" aria-describedby="senha" value={login.password} onChange={e => setLogin( {...login, password: e.target.value})}/>
          <FormHelperText id="password-helper-text">
            Nós nunca compartilharemos a sua senha
          </FormHelperText>

          <Button variantColor="teal" size="md" isLoading={loading} loadingText="Enviando" onClick={e => handleSend()}>
          Login
          </Button>
        </FormControl>
      </div>

      }
    {
      modules.auth && history.push('/admin')
    }
    </>
    )
}

export default Login;