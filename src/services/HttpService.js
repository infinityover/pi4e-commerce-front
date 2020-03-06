const axios = require('axios');

const api = 'https://api-senacsp-ecommerce.herokuapp.com/api/v1/'
  async function Get (endpoint) {
    return await axios.get(api+endpoint);
  }

  async function Post (endpoint, object) {
    return axios.post(api+endpoint, object);
  }

  async function Put (endpoint, object) {
    return axios.put(api+endpoint, object);
  }

  async function Delete (endpoint) {
    return axios.delete(api+endpoint);
  }

  async function Patch (endpoint, object) {
    return axios.patch(api+endpoint, object);
  }


export { Get, Post, Put, Delete, Patch} ;
