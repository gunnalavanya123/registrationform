import React, { useState } from 'react'
import {Button, nav} from 'bootstrap'
import './navbar.css'
import { Modal } from "react-bootstrap"
const Navbar = () => {

  const [form, setform] = useState(false);


  return (
    <nav class="navbar navbar-expand-lg navbar-light navitems ">
      <div className='right'>
        <p>
        Inventory Management App
        </p>
        <p className='productsinstock'>
            Products in stock : 2
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
      <form >
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