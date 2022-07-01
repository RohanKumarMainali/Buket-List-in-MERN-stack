import React from 'react'
import '../Style/style.css';
import {useState,useEffect} from 'react';

import Axios from 'axios';
import  { Modal,ModalBody,ModalHeader } from 'reactstrap';

function BucketList() {
    const [object,setData]=useState([]);
    const [itemId,setId]=useState();
    const [modal,setModal]=useState(false);
    const [editModal,setEditModal]=useState(false);

    const [obj,setObj]=useState({
      name:"",
      price:"",
      date:'',
    })

    const [singleItem,setSingleItem]=useState({
      name:"",
      price:"",
      date:'',

    })


    

    const handleEditChange=(e)=>{

      const newData ={...singleItem}
      newData[e.target.id] = e.target.value
      setSingleItem(newData)
      
      console.log(singleItem);

    }

    const handleChange=(e)=>{

      const newData ={...obj}
      newData[e.target.id] = e.target.value
      setObj(newData)
      
      console.log(obj);

    }
    
    useEffect(()=>{
    Axios.get('http://localhost:4000/api/v1/get/').
    then(res =>{setData(res.data)})
    .catch(err=>console.log(err));
    },[object]);

    //  ---------------adding item ---------------------

    const handleAdd=()=>{
      console.log(obj);
      Axios.post('http://localhost:4000/api/v1/add/',{
        body: obj
      }).
      then(res => console.log(res.data))
  
      .catch(err=> console.log(err));
      console.log(obj.name)
      

    }

    // fetch item by id

    const getByItemId=(id)=>{
      setId(id);
      console.log(id);
       Axios.get(`http://localhost:4000/api/v1/get/${id}`).
      then(res => setSingleItem(res.data))
      .catch(err=> console.log(err)); 
      
      
      console.log("to edit" + singleItem.name);

      setEditModal(!editModal);
      
      
      
    }

  


    // edit the item
    const handleEdit=async()=>{
      
      await Axios.put(`http://localhost:4000/api/v1/update/${itemId}`,{
        body: singleItem
      }).
      then(res => console.log(res.data))
  
      .catch(err=> console.log(err));
      console.log(singleItem)
      console.log("update succesfull");
      setEditModal(!editModal);

    }





    // delete the item

    const deleteList =async(id)=>{
        const item_id=id;

        console.log(item_id)
     await Axios.delete(`http://localhost:4000/api/v1/delete/${item_id}`)
      .then(res => console.log(res))
      .catch(err=> console.log(err));
    }

  

  return (
    <div>

      <Modal
      size="lg"
      isOpen={modal}
      toggle={()=> setModal(!modal)}
      >
        <ModalHeader
        toggle={()=> setModal(!modal)}
        >
          Add new item in bucket list
        </ModalHeader>
        <ModalBody>

          <form className='mb-3' method='POST'>

              <label className='form-label'>Name: </label>
              <input className='form-control' id='name' type='text' placeholder='Enter item name'value={obj.name} onChange={(e)=>handleChange(e)}></input>
              <label className='form-label'>Price: </label>
              <input className='form-control' id='price' type='number' placeholder='Enter item name'value={obj.price} onChange={(e)=>handleChange(e)}></input>
              <label className='form-label'>Date: </label>
              <input className='form-control' id='date' type='number' placeholder='Enter date ' value={obj.data} onChange={(e)=>handleChange(e)}></input>
          </form>
          <button onClick={handleAdd}>Add</button>

        </ModalBody>
      </Modal>


      <Modal
      size="lg"
      isOpen={editModal}
      toggle={()=> setEditModal(!editModal)}
      
      >
        <ModalHeader
        toggle={()=> setEditModal(!editModal)}
        >
          Edit item in bucket list
        </ModalHeader>
        <ModalBody>

          <form className='mb-3' method='POST'>

              <label className='form-label'>Name: </label>
              <input className='form-control' id='name' type='text' placeholder='Enter item name'value={singleItem.name} onChange={(e)=>handleEditChange(e)}></input>
              <label className='form-label'>Price: </label>
              <input className='form-control' id='price' type='number' placeholder='Enter item name'value={singleItem.price} onChange={(e)=>handleEditChange(e)}></input>
              <label className='form-label'>Date: </label>
              <input className='form-control' id='date' type='number' placeholder='Enter date ' value={singleItem.date} onChange={(e)=>handleEditChange(e)}></input>
          </form>
          <button onClick={handleEdit}>Update</button>

        </ModalBody>
      </Modal>

        <h1 className='heading'>Bucket List</h1>

        <div className='container'>
   

          <button className='add-item' onClick={()=>setModal(true)}>Add New Item</button>

        {object.map((user) => (
        < div className='gridContainer'>
            <span  className='gridItem'>{user.name}</span>
            <span className='gridItem'>Price: Rs {user.price}</span>
            <span className='gridItem'>Date: {user.date}</span>
         

            <div className='buttons'>
              
              <button className ='buttonItem edit'  onClick={(id)=>getByItemId(user._id)  }>Edit</button>
               <button className='buttonItem delete' onClick={(id)=>deleteList(user._id)}>Delete</button>
              
            
            
            </div>           
        </div>
      ))}
     </div>

    </div>
  )
}

export default BucketList