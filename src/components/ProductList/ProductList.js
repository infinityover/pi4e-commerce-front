import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { Get, Post, Put, Patch, Delete } from '../../services/HttpService';
import Modal from 'react-bootstrap/Modal'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


function ProductList() {

  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [QA, setQA] = useState([]);
  const [QADeleted, setQADeleted] = useState([]);
  const [imgArray, setImgArray] = useState([]);

  async function loadProducts(){
    setList([]);
    const response = await Get('products');
    setList( response.data.data.itens);
  }
  const productFiller = 'https://www.pngitem.com/pimgs/m/84-849583_cardboard-box-png-box-png-transparent-png.png';

  const handleClose = () => {
    setClearData();
    setShow(false);
    loadProducts();
  }

  const handleShow = (item) => {
    if(item){
      setData(item);
    }
    setShow(true);
  }

  const setClearData = () =>{
    setId("");
    setName("");
    setPrice(0);
    setQuantity(0);
    setDescription("");
    setQA([]);
    setImgArray([]);
  }

  const setData = async (item) => {
    setId(item.id);
    setName(item.name);
    setPrice(item.price);
    setQuantity(item.quantity);
    setDescription(item.description);
    await setQA(item.questionAndAnswers);
    setImgArray(item.links);
  }


  function setQuestion(question,index){
    QA[index].question = question;
    setQA([...QA]);
  }


  function setAnswer(answer,index){
    QA[index].answer = answer
    setQA([...QA]);
  }

  const addQA = () => setQA([...QA, {"question":"", "answer":""}]);

  const removeQA = (index) => {
    setQADeleted([...QADeleted, QA[index]])
    QA.splice(index,1);
     setQA([...QA]);
  }

  async function deleteQA(){
    for (var element of QADeleted) {
      console.log(element.id);
      if(element.id) await Delete('questions-and-answers/'+element.id);
    }
  }

  async function deleteProduct(id){
    await Delete('products/'+id);
  }

  async function handleSubmit(e){
    e.preventDefault();

    if(!id) {
      const product = await Post("products",{
        name,
        price,
        quantity,
        description,
      });
    }else{
      await Put("products/"+id,{
        name,
        price,
        quantity,
        description,
      });

      if(QADeleted.length > 0) deleteQA();
      // await Patch('products/questions-answers/'+id,{
      //   "questionsAndAnswers": [...QA]
      // });
    }
    handleClose();
}

  useEffect(() => {
    loadProducts();

  },[])

  return (
    <>
    {list.length > 0 &&
      <div className="table-products" >
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Preço</th>
            <th scope="col">Quantidade em estoque</th>
            <th scope="col">Descrição</th>
            <th>Comandos</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item,index) => (
            <tr key={index}>
              <th><img src={item.links[0] ? item.links[0].imageFullPath : productFiller} className='product-image'/></th>
              <th scope="row">{item.name}</th>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td className='column-command'>
                <button className="btn btn-primary" type="submit" onClick={e => handleShow(item)}>Editar</button>
                <button type="button" className="btn btn-danger" onClick={e => deleteProduct(item.id)}>Excluir</button>
              </td>
            </tr>
            ))
          }
        </tbody>
      </table>
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


    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closebutton="true">
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-form">
            <input hidden value={id} onChange={e => setId(e.target.value)}/>
            <label>Nome:</label><input type="text" className="form-control" placeholder="Nome do produto" value={name}
                onChange={e => setName(e.target.value)} required/>
            <label>Preço:</label><input type="number" className="form-control" placeholder="Preço" value={price} onChange={e => setPrice(e.target.value)}/>
            <label>Qtd estoque:</label><input type="number" className="form-control" placeholder="Quantidade em estoque" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            <label>Descrição:</label><input type="text" className="form-control" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} required/>
            <label>Imagens:</label><input type="file" multiple accept="image/*"/>


          </div>
          <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Pergunta</th>
            <th scope="col">Resposta</th>
          </tr>
        </thead>
        <tbody>
          {QA.map((item,index) => (
            <tr key={index}>
              <td><input type="text" className="form-control" placeholder="Pergunta" value={item.question} onChange={e => setQuestion(e.target.value, index)} required/></td>
              <td><input type="text" className="form-control" placeholder="Resposta" value={item.answer} onChange={e => setAnswer(e.target.value, index)} required/></td>
              <td><button className="btn btn-danger" type="submit" onClick={e => removeQA(index)}>Remover</button></td>
            </tr>
            ))
          }
        </tbody>
      </table>
      <button className="btn btn-primary" type="submit" onClick={e => addQA()}>Adicionar</button>
      </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={handleClose}>Cancelar</button>
          <button type="button" className="btn btn-success" onClick={handleSubmit}>Salvar</button>
        </Modal.Footer>
      </Modal>
    </>
  </>
  );
}



export default ProductList;
