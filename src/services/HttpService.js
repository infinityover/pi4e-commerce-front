const axios = require('axios');



const api = 'https://api-senacsp-ecommerce.herokuapp.com/api/v1/'
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


export { Get, Post, Put, Delete, Patch} ;
