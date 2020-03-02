const axios = require('axios');

const api = 'http://api-senacsp-ecommerce.herokuapp.com/api/v1/'
  async function Get (endpoint) {
    return await axios.get(api+endpoint);
  }

  function Post (endpoint, object) {
    return axios.post(api+endpoint, object);
  }

  function Put (endpoint, object) {
    return axios.put(api+endpoint, object);
  }

  function Delete (endpoint) {
    return axios.delete(api+endpoint);
  }

  function Patch (endpoint, object) {
    return axios.patch(api+endpoint, object);
  }


export { Get, Post, Put, Delete, Patch} ;
