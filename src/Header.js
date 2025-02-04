import React from 'react'
import './header.css'
import icon from './images/login.jpg'
const Header = () => {
  return (
    <div className='hero' >
        <div><img src={icon} /></div>
        <div >
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Features</li>
                <li>Solutions</li>
                <li>Pricing</li>
                <button>Login</button>
                <button>Try it free</button>
            </ul>
            
        </div>
    </div>
  )
}

export default Header