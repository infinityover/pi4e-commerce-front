const axios = require('axios');


  function Get (url, endpoint) {
    return axios.get(url+endpoint);
  }

  function Post (url, endpoint, object) {
    return axios.post(url+endpoint, object);
  }

  function Put (url, endpoint, object) {
    return axios.put(url+endpoint, object);
  }

  function Delete (url, endpoint) {
    return axios.delete(url+endpoint);
  }

  function Patch (url, endpoint, object) {
    return axios.patch(url+endpoint, object);
  }


export { Get, Post, Put, Delete, Patch} ;
