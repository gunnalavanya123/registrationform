import React, { useState } from 'react'
import './register.css'
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import bg from './images/images.jpeg'

const Register = () => {
    const initialvalues={
      username: "",
        email:'',
        organizationname: "",
    }

    const validationschema=Yup.object({
      username: Yup.string()
      .test(
        "no-spaces",
        "Username should not contain spaces",
        value => value && !/^\s|\s$/.test(value) // Regex checks for spaces
      )
      .matches(
        /^[a-zA-Z ]*$/,
        "Username should not contain special characters and numbers"
      )

      .max(100, "Username must be at most 100 characters")
      .required("Username is required"),
        email: Yup.string()
      .email("Enter a valid email") // Checks for valid email format
      .test(
        "no-spaces",
        "Password should not contain spaces",
        value => !/\s/.test(value) // Regex checks for spaces
      )
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter a valid email"
      ) // Custom regex to enforce a domain extension
      .max(100, "Email must be at most 100 characters")
      .required("Email is required"),

      organizationname: Yup.string()
      .test(
        "no-spaces",
        "organizationname should not contain spaces",
        value => value && !/^\s|\s$/.test(value) // Regex checks for spaces
      )
      .matches(
        /^[a-zA-Z ]*$/,
        "organizationname should not contain special characters and numbers"
      )

      .max(100, "organizationname must be at most 100 characters")
      .required("organizationname is required"),
    })

    const [form,setform]=useState(null)
    const navigate = useNavigate();

    const organization=(event)=>{
        if (event.target.id==="1"){
            console.log("organization")
            setform("organization")
        }
        else{
            console.log("individual")
            setform("individual")
        }
    }

    const handleLoginClick = () => {
        // Navigate to the login page
        navigate('/login');
      };

  return (
    
    <div style={{backgroundImage:`url(${bg})`,width:'100vw',height:'109vh',objectFit:'cover',objectPosition:'center',marginTop:'-50px',display: 'flex',justifyContent: 'center',alignItems:'center'}}>
    <div className='adduser'>
        <h2 >Sign Up</h2>
        <div className='but'>
        <button type="button" class="toggle" id="2" onClick= {organization}>Individual</button>
        <button type="button" class="toggle" id="1" onClick= {organization}>Organization</button>
        </div>
        <Formik  
        initialValues={initialvalues}
        validationSchema={validationschema}
        validateOnChange={true}
        validateOnBlur={false}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            validateField,
            setFieldTouched,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
         <Form className='adduserform'>
        {form==="organization" && (
            <div className='inputgroup orgname'> 
            
            <input type='text'
            
            id="organizationname"
            name='organizationname'
            className={`orginput form-control ${
              touched.organizationname && errors.organizationname ? "is-invalid" : ""
            }`}
            onChange={e => {
              handleChange(e) // Formik's built-in handleChange
              
              setFieldTouched("organizationname") // Trigger validation immediately
            }}
            onBlur={handleBlur}
            />
            <label className=" orglabel" 
            htmlFor='organizationname'> OrganizationName:</label>
            {touched.organizationname && errors.organizationname ? (
                  <div className="invalid-feedback">{errors.organizationname}</div>
                ) : null}
            </div>

        )}
            <div className='inputgroup'>
                <input type='text'
                id="username"
                name='username'
                className={`form-control ${
                  touched.username && errors.username ? "is-invalid" : ""
                }`}
                onChange={e => {
                  handleChange(e) // Formik's built-in handleChange
                  validateField("username")
                  setFieldTouched("username") // Trigger validation immediately
                }}
                onBlur={handleBlur}
                
                />
                <label htmlFor='username'>UserName:</label>
                {touched.username && errors.username ? (
                  <div className="invalid-feedback">{errors.username}</div>
                ) : null}
                <div className='inputgroup'> 
                <input type='email'
                id="email"
                name='email'
                className={`form-control ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
                onChange={e => {
                  handleChange(e) // Formik's built-in handleChange
                  validateField("email")
                  setFieldTouched("email") // Trigger validation immediately
                }}
                onBlur={handleBlur}
                
                />
                <label htmlFor="email">Email</label>

                {touched.email && errors.email ? (
                  <div className="invalid-feedback">{errors.email}</div>
                ) : null}</div>
                <button type="button" class="btn btn-success">Sign Up</button>
            </div>
            <div className='login'>
        <p> Already have an account ? </p>
        <button type='submit' onClick={handleLoginClick} >Login </button>
        </div>
        </Form>
          )}
        </Formik>
        
        
    </div>
    </div>
  )
}

export default Register