import {React,useState} from "react";
import { useNavigate} from 'react-router-dom';
import './login.css'
import { Formik,Form } from "formik";
import * as Yup from 'yup'
import bg from './images/login.jpg'

const Login = () => {

  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate=useNavigate()
  const handleLoginClick = () => {
    // Navigate to the login page
    navigate('/');
  };

  const initialValues={
    email:'',
    password: "",
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }


  const validationSchema = Yup.object({
    email:Yup.string().email("Enter a valid email") // Checks for valid email format
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
    password:Yup.string().required("Please Enter Your Password"),
  })
  
  return (
    <div style={{backgroundImage:`url(${bg})`,width:'100vw',height:'109vh',objectFit:'cover',objectPosition:'center',marginTop:'-50px',display: 'flex',justifyContent: 'center',alignItems:'center'}}>
    <div className='adduser'>
        <h2 >Login</h2>
        
        <Formik  
                initialValues={initialValues}
                validationSchema={validationSchema}
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
            <div className='inputgroup'>
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
                <div className='inputgroup'>
                
                <input 
                
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
                // value={validationSchema.values.password}
                onChange={e => {
                  handleChange(e) // Formik's built-in handleChange
                  validateField("password")
                  setFieldTouched("password") // Trigger validation immediately
                }}
                onBlur={handleBlur}
              />
             <i
  className={`bi ${passwordVisible ? "bi-eye" : "bi-eye-slash"} eyeicon`}
  onClick={togglePasswordVisibility}
/>
               
              <label htmlFor="password" style={{marginTop:'2px'}}>Password</label>
              
              {touched.password && errors.password ? (
                  <div className="invalid-feedback">{errors.password}</div>
                ) : null}
                </div>
                <button type="button" class="btn btn-success" style={{marginTop:'15px'}}>Login</button>
            </div>
            <div className='login'>
        <p> New User</p>
        <button type='submit' onClick={handleLoginClick} >Register </button>
        </div>
        </Form>
          )}
          </Formik>
        
          </div>   
    </div>
  );
};

export default Login;
