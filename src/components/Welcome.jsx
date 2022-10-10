import styles from "../style";
import background from "../images/w.svg";
import logo from "../images/Logo.png";
import React, { Component } from 'react';


const Hero = () => {
  return (
    <div id="hero" className="hero">
      <div className="content">
        <img className="logo" src={logo}/>
        <p>
        Welcome to </p>
        <p>
        Click to Cart
        </p>

          <a href="signup" className="button-el">Log In</a>
          <a href="signin" className="button-el">Sign Up</a>
        
        <h2> We find our phones quicker than pen and paper, so what better way to store our shopping lists, making them more organized and easily accessible?</h2>
        <h1> Created by Adam Gordon, Jaden Harris, Lerusha Munien, Wasim Rahiman and Yasira Dedat</h1>
      </div> 
      <div className="overlay" style={{background: `url(${background})`}}/>
 
 
    </div>

    

  )
}

export default Hero; 



