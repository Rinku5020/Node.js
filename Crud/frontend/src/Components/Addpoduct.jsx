import React, { useState } from 'react'
import axios from "axios"
const initialstate={
    image:'',
    category:'',
    title:'',
    price:'',
    description:''
}
// post Method
function Addpoduct() {
    const [formData,setFormData]=useState(initialstate)
    const {image,category,price,description,title}=formData
    const handleChnage=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault()
        axios.post("http://localhost:8080/addproduct",formData)
        .then((res)=>{
            alert("data is posted")
            console.log(res)})
        .catch((err)=>
        {
            console.log(err)
        })
    }
  return (
    <div>
    <h2>Post Data</h2>
      <form onSubmit={handleSubmit}>
        <input name='image' value={image} onChange={handleChnage} type="text" placeholder='image' /> <br /><br />
        <input  name='title' value={title} onChange={handleChnage} type="text" placeholder='Title' /><br /><br />
        <select name="category" value={category} onChange={handleChnage} ><br /><br />
            <option value="men's clothing">men's clothing</option>
            <option value="jeweleryz">jewelery</option>
            <option value="electronics">electronics</option>
            <option value="women's clothing">women's clothing</option>
        </select><br /><br />
        <input type="text" name="price" value={price} onChange={handleChnage} placeholder='Price' /><br /><br />
        <input type="text" name="description" value={description} onChange={handleChnage} placeholder='Description' /><br /><br />
        <input type="submit" /> <br /><br />
      </form>
    </div>
  )
}

export default Addpoduct
