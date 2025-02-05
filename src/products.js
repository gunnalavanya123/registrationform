import React from 'react';
import { Table,Modal} from 'react-bootstrap';
import axios from 'axios'
import { useState,useEffect } from 'react';
import './products.css'

const Products = () => {
  const [products,setproducts]=useState([])
  const [editform,seteditform]=useState(false)
  const [selectedProduct, setSelectedProduct] = useState({
    product_id: '',
    name: '',
    quantityinstock: '',
    quantity_sold: '',
    unit_price: '',
    revenue: ''
  });

  const [deleted,setdeleted]=useState({
    product_id: '',
  })

  const fetchproducts= async()=>{
    try{
        const response= await axios.get("http://127.0.0.1:8000/products/")
        console.log("response",response.data)
        setproducts(response.data)
    }
    catch (error) {
        console.error("Error fetching products:", error);
      }
  }

  useEffect (()=>{
    fetchproducts();
  },[])

  const handleeditclick=(product)=>{
    console.log("product",product)
    setSelectedProduct(
      {
        product_id: product.product_id,
        name: product.name,
        quantityinstock: product.quantityinstock,
        quantity_sold: product.quantity_sold,
        unit_price: product.unit_price,
        revenue: product.revenue
      }
    )
    seteditform(true)
  }

  const formedit=async()=>{
    try{
      const response=await axios.put(`http://127.0.0.1:8000/update_products/${selectedProduct.product_id}`,selectedProduct)
      fetchproducts();
      seteditform(false);
    }
    catch(error){
      console.error("Error updating product:", error);
    }
  }

  const handledelete=(product)=>{
    const productId = product.product_id;
    deleteelement(productId)
  }

  const deleteelement=async (productId)=>{
    try{
    const response=await axios.delete(`http://127.0.0.1:8000/products/${productId}`)
    fetchproducts();
    }
    catch(error){
      console.log('error deleting product',error)
    }
  }
  
  return (
    <div className="d-flex justify-content-center m-4">
      <Table bordered striped hover className="text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Quantity In Stock</th>
            <th>Quantity Sold</th>
            <th>Unit Price</th>
            <th>Revenue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {products.length>0 ? (products.map((product)=>(
                <tr>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td>{product.quantity_sold}</td>
                <td>{product.quantityinstock}</td>
                <td>{product.unit_price}</td>
                <td>{product.revenue}</td>
                <td >
                    <button className='actions' onClick={()=>handleeditclick(product)}>Edit</button>
                    <button className='actions' onClick={()=>handledelete(product)}>Delete</button>
                </td>
            </tr>
            ))
        ) : (
            <tr>
              <td colSpan="6">No products found</td>
            </tr>
            )}
            
        </tbody>
      </Table>
      <Modal
      size='lg'
      show={editform}
      onHide={()=>{
        seteditform(false)
      }}
       >
        <Modal.Header closeButton>
            <Modal.Title> Edit Products</Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => {
          e.preventDefault();
          formedit();
          seteditform(false)
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
                                value={selectedProduct.name}
                                onChange={(e) => setSelectedProduct(prevState => ({...prevState,name: e.target.value }))} // Update the state
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
                                value={selectedProduct.quantityinstock}
                                onChange={(e)=>setSelectedProduct(prevState=>({...prevState,quantityinstock:e.target.value}))}
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
                                value={selectedProduct.quantity_sold}
                                onChange={(e)=>setSelectedProduct(prevState=>({...prevState,quantity_sold:e.target.value}))}
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
                                value={selectedProduct.unit_price}
                                onChange={(e)=>setSelectedProduct(prevState=>({...prevState,unit_price:e.target.value}))}
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
                                value={selectedProduct.revenue}
                                onChange={(e)=>setSelectedProduct(prevState=>({...prevState,revenue:e.target.value}))}
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
    </div>
  );
};

export default Products;
