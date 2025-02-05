import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'
import { Modal } from "react-bootstrap"
import axios from 'axios'
const Navbar = () => {
  const [products,setproducts]=useState([])
  const [form, setform] = useState(false);
  const [name, setName] = useState('');
    const [quantityInStock, setQuantityInStock] = useState('');
    const [quantitySold, setQuantitySold] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [revenue, setRevenue] = useState('');
    const[productstock,setproductstock]=useState(0)

  const productsadd=async()=>{
    console.log('Function called');
    try{
        const payload={
            
            name,
            quantityinstock: quantityInStock,
            quantity_sold: quantitySold,
            unit_price: unitPrice,
            revenue,
              

        }
        const response= await axios.post('http://127.0.0.1:8000/add-product/4',payload,{
            headers:{
                 'Content-Type': 'application/json'
            }
        })
        console.log('Product added successfully:', response.data);
        fetchproducts()
    }
    catch(error){
        console.error('Error adding product:', error.response ? error.response.data : error.message);
    }
  }

 const fetchproducts=async ()=>{
  try{
    const response= await axios.get("http://127.0.0.1:8000/products/")
    console.log("response1",response.data)
    setproducts(response.data)
    productsinstock(response.data);
   
  }
  catch(error){
    console.log("Error fetching products:", error)
  }
 }

 
 const productsinstock=(products)=>{
  console.log("products",products)
  let stockcount=0
  products.forEach(product => {
  if(product.quantityinstock>0){
    stockcount+=1
  }
    
  });
  console.log("Total products in stock:", stockcount);
  setproductstock(stockcount)
  
 }

 useEffect(() => {
  fetchproducts();
}, []);

  return (
    <nav class="navbar navbar-expand-lg navbar-light navitems ">
      <div className='right'>
        <p>
        Inventory Management App
        </p>
        <p className='productsinstock'>
            Products in stock : {productstock}
        </p>
      </div>
      <div className='left'>
      <button className='addproducts' onClick={()=>setform(true)}> Add Product</button>
      <input
      type='text'
      placeholder='Search'
      ></input>
      <button className='search'> search</button>
      </div> 
    <Modal
      size="lg "
      show={form}
      onHide={() => {
        setform(false) // Close the modal
      }}
      
    >
      <Modal.Header closeButton>
      <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <form onSubmit={(e) => {
          e.preventDefault();
          productsadd();
          setform(false)
        }}>
      <Modal.Body>
            <div className="row mt-4 mb-4">
              <div className="col-md-6">
                <div className="mb-3">
                <label className="form-label">
                Product Name
                    <span className="mandatory" style={{ color: "red" }}>
                      {" "}
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: "100%" }}
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                  />
                  
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                  Quantity In Stock:
                    <span className="mandatory" style={{ color: "red" }}>
                      {" "}
                      *
                    </span>
                  </label>
                  <input

                    type="text"
                    style={{ width: "100%" }}
                    className="form-control"
                    value={quantityInStock}
                    onChange={(e)=> setQuantityInStock(e.target.value)}
                />
              
              </div>
            </div>
            <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                  Quantity Sold
                    <span className="mandatory" style={{ color: "red" }}>
                      {" "}
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    className="form-control"
                    value={quantitySold}
                    onChange={(e)=>setQuantitySold(e.target.value)}
                />
              
              </div>
            </div>
            <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                  Unit Price
                    <span className="mandatory" style={{ color: "red" }}>
                      {" "}
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    className="form-control"
                    value={unitPrice}
                    onChange={(e)=>setUnitPrice(e.target.value)}
                />

              
              </div>
            </div>
            <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                  Revenue
                    <span className="mandatory" style={{ color: "red" }}>
                      {" "}
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    className="form-control"
                    value={revenue}
                    onChange={(e)=>setRevenue(e.target.value)}
                />

              
              </div>
            </div>
            
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Submit
            </button>
          </Modal.Footer>

                
        </form>

    </Modal>
     
      
      
      </nav>
      
     
  )
}

export default Navbar