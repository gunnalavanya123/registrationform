import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './register'; // Import Register component
import Login from './login'; // Import Login component (you can create this page)
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './Header';
import CoustomNavbar from './navbar';
import Products from './products';

const App = () => {
  return (
    <Router>
     
      <CoustomNavbar/>
      <Products/>
    
   
      
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/header' element={<Header/>} />  
      </Routes>
    </Router>
  );
};

export default App;
