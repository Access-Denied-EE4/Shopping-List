import background from "../images/w.svg";
import logo from "../images/Logo.png";
import React, { Component } from 'react';


const Hero = () => {
  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>

    <div className='image-container'>
            <img style={{width:190, height:190, position: "fixed", top:'2vh'}} src={logo}></img>
    </div>
     
  
    <h1 style={{color:'#2A2C41',fontFamily:'serif',fontWeight: 'bold', lineHeight: 0.8,  fontSize: '300%',marginBottom: '0.5em',textAlign  : 'center',position: "relative", top: "21vh"}}>Welcome to Click to Cart</h1>
  
    <p style={{
      fontSize: '150%',
      fontFamily:'serif',
      fontWeight: 'bold',
    lineHeight: 1.3,
    marginBottom: '1em',
      color:'#998a18 ', textAlign  : 'center', alignSelf: 'center',
position: "relative",
top: "19vh"
  
    }}>


Your gateway to a better shopping experience!
    </p>

    <button style={{
      backgroundColor: '#2A2C41',
      border: '2px solid rgba(245, 245, 241, 0.2)',
      color: '#ffffff',
      borderColor: 'white',
    display: 'flex',
    alignItems:' center',
    justifyContent: 'center',
    
    boxSizing: 'border-box',
    
    borderRadius:' 5px',
    fontWeight: 600,
      height: '10vh',
      width:'30vh',
      borderWidth: '3px',
      textAlign  : 'center', alignSelf: 'center',
      
      fontSize: '23px',
      lineHeight: '50px',
      padding: '10 40px',
      margin: 'auto',
      position: "relative",
      top: "20vh"

    }}> 
      <a href="signup" className="button">Sign Up</a>
    </button>

<button style={{
      backgroundColor: '#2A2C41',
      border: '2px solid rgba(245, 245, 241, 0.2)',
      color: '#ffffff',
      borderColor: 'white',
    display: 'flex',
    
    
    boxSizing: 'border-box',
    
    borderRadius:' 5px',
    fontWeight: 600,
      height: '10vh',
      width:'30vh',
      borderWidth: '3px',
      textAlign  : 'center', alignSelf: 'center',
      
      fontSize: '23px',
      lineHeight: '50px',
      padding: '10 40px',
      alignItems:' center',
    justifyContent: 'center',
    margin: 'auto',
    position: "relative",
   top: "22vh"

    }}> 
      <a href="signin" className="button">Log In</a>
    </button>
    </div>

  )
}

export default Hero; 

