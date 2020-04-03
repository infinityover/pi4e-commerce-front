import React, { useState, useEffect } from 'react';
import './ProductModal.css';
import { Get, Post, Put, Delete } from '../../services/HttpService';
import Modal from 'react-bootstrap/Modal'


function ProductModal(props) {

  useEffect(() => {
    setShow(props.show);

  },[])

  const [altQtd, setAltQtd] = useState(false);
  const [show, setShow] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [QA, setQA] = useState([]);
  const [QADeleted, setQADeleted] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [imgsB64, setImgsB64] = useState([]);
  const [imgsDeleted, setImgsDeleted] = useState([]);

  const handleClose = () => {
    props.setShow(false);
    setClearData();
  }


  const setClearData = () =>{
  setQADeleted([]);
  setImgs([]);
  setImgsB64([]);
    setId("");
    setName("");
    setPrice(0);
    setQuantity(0);
    setDescription("");
    setQA([]);
    setImgsDeleted([]);
    setAltQtd(false);
  }

  const setData = async (item) => {
    setId(item.id);
    setName(item.name);
    setPrice(item.price);
    setQuantity(item.quantity);
    setDescription(item.description);
    setPathImgs(item.links);
    setQA(item.questionAndAnswers);
  }

  function setPathImgs(item){
    let links = [];
    item.forEach(element => {
      links.push({id: element.id,path: element.imageFullPath});
    });
    setImgs(links);
  }


  function setQuestion(question,index){
    QA[index].questionAndAnswer.question = question;
    setQA([...QA]);
  }


  function setAnswer(answer,index){
    QA[index].questionAndAnswer.answer = answer
    setQA([...QA]);
  }

  const addQA = () => setQA([...QA, {"id":"","questionAndAnswer":{ "question":"", "answer":""}} ]);

  const removeQA = (index) => {
    setQADeleted([...QADeleted, QA[index]])
    QA.splice(index,1);
     setQA([...QA]);
  }

  async function deleteQA(){
    for (var element of QADeleted) {
      if(element.id) await Delete('questions-and-answers/'+element.id);
    }
  }

  function deleteImgs(){
    imgsDeleted.forEach(element => {
      if(element.id) Delete('products/images/'+element.id);
    });
  }

  async function deleteProduct(prodId){
    await Delete('products/'+prodId);
  }

  async function insertImgs(prodId){
    await Post('products/images/'+prodId, {files: imgsB64});
  }


  async function handleSubmit(e){
    e.preventDefault();
    let product;
    if(!id) {
      product = await Post("products",{
        name,
        price,
        quantity,
        description,
      });
      await setId(product.data.data.productId);
    }else{
      await Put("products/"+id,{
        name,
        price,
        quantity,
        description,
      });    
    }

    if(QADeleted.length > 0) await deleteQA();
    if(imgsB64.length > 0) await insertImgs(id || product.data.data.productId);
    if(QA.length > 0) await insertQA(id || product.data.data.productId);
    if(imgsDeleted.length>0) await deleteImgs();

    handleClose();
  };
  
  async function insertQA(prodId){
    for (const element of QA) {
      if(element.id){
        await Put('questions-and-answers/'+element.id,{
          "questionsAndAnswer": element.questionAndAnswer
        });
      }else{
        await Post('products/questions-answers/'+prodId,{
          "questionsAndAnswers":  [ element.questionAndAnswer ]
        });
      }
    }
  }

  function deleteImg(index){
    setImgsDeleted([...imgsDeleted, imgs[index]]);
    imgs.splice(index,1);
    setImgs([...imgs]);
  }

  async function uploadMultipleFiles(e){
    let fileObj = [];
    let fileArray = imgs;
    fileObj.push(e.target.files)

    for (let i = 0; i < fileObj[0].length; i++) {

        var reader = new FileReader();
        reader.onload = function(e) {
          setImgsB64([...imgsB64, {buffer: e.target.result.split(',')[1]}]);
        }
        reader.readAsDataURL(fileObj[0][i]);
        fileArray.push({path: URL.createObjectURL(fileObj[0][i])} )


    }
    setImgs(fileArray)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closebutton="true">
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-form">
            <input hidden value={id} onChange={e => setId(e.target.value)}/>
            <label>Nome:</label><input readOnly={altQtd} type="text" className="form-control" placeholder="Nome do produto" value={name}
                onChange={e => setName(e.target.value)} required/>
            <label>Preço:</label><input type="number" readOnly={altQtd} className="form-control" placeholder="Preço" value={price} onChange={e => setPrice(e.target.value)}/>
            <label>Qtd estoque:</label><input type="number" className="form-control" placeholder="Quantidade em estoque" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            <label>Descrição:</label><input type="text" readOnly={altQtd} className="form-control" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} required/>
            <label>Imagens:</label><input type="file" disabled={altQtd} className="form-control" onChange={uploadMultipleFiles} multiple accept="image/*" />
          </div>
          
          <div className="form-group multi-preview">
            {imgs.map((url,indx) => (
                <div key={indx} className="form-group multi-preview">
                  <img src={url.path} alt="..." className="preview" />
                  <button type="button" className="btn btn-danger" disabled={altQtd} onClick={e => deleteImg(indx)}>Excluir</button>
                </div>
              ))}
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
              <td><input type="text" className="form-control" placeholder="Pergunta" value={item.questionAndAnswer.question} onChange={e => setQuestion(e.target.value, index)} required/></td>
              <td><input type="text" className="form-control" placeholder="Resposta" value={item.questionAndAnswer.answer} onChange={e => setAnswer(e.target.value, index)} required/></td>
              <td><button className="btn btn-danger" type="submit" onClick={e => removeQA(index)}>Remover</button></td>
            </tr>
            ))
          }
        </tbody>
      </table>
      <button className="btn btn-primary" disabled={altQtd} type="submit" onClick={e => addQA()}>Adicionar</button>
      </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={handleClose}>Cancelar</button>
          <button type="button" className="btn btn-success" onClick={handleSubmit}>Salvar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductModal;
