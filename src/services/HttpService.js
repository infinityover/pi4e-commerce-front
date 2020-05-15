const axios = require('axios');



const api = 'http://localhost:9000/api/v1/'
  async function Get (endpoint, auth=null) {
    return await axios.get(api+endpoint,  auth);
  }

  async function Post (endpoint, object, auth=null) {
    return axios.post(api+endpoint, object, auth);
  }

  async function Put (endpoint, object, auth=null) {
    return axios.put(api+endpoint, object, auth);
  }

  async function Delete (endpoint, auth=null) {
    return axios.delete(api+endpoint, auth);
  }

  async function Patch (endpoint, object, auth=null) {
    return axios.patch(api+endpoint, object, auth);
  }

  async function GetCep(cep){
    return await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  }


export { Get, Post, Put, Delete, Patch, GetCep} ;
