import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {UserAuth} from '../contexts/AuthContext';
import Verification from './Verification';
import ClickToCart from "../images/CTCC.jpg"
import { Alert } from 'react-bootstrap';

const Signup = () => {

    //setup states for email and password
    //set to empty string by default as no email/password by default
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    //error state-> allows us to set errors on the screen
    //also empty string as no errors bu default
    const [error,setError]=useState('');
    
    //create state for loading 
    const [loading, setLoading]=useState(false);

    //set the imported fucntion from the AuthContext file
    const {createUser}= UserAuth()
    const {user}=UserAuth();

    const navigate=useNavigate();

    //handle submit function
    //async as waits for submit button to be pressed
    //pass event e so page dosent refresh when hit submit
    const handleSubmit= async (e)=>{

        //prevents page from refreshing when you submit
        e.preventDefault();
        //make sure error is emoty string as no current error
        setError('');

        if(email.length==0)
        {
            return setError("Please enter an email address");
        }
        if(password.length==0)
        {
            return setError("Please enter a password");
        }
        if(password.length<6)
        {
            return setError("Please enter a password at least 6 characters long")
        }

        try{
            setError('');
            setLoading(true);
            await createUser(email,password);
            //after user created, naviage to verification page page
            navigate('/verification');

        }catch(e){
            setError("Failed to create an account")
            console.log(e.message);
        }
        setLoading(false);
    }

  return (

    <>
        <div className='image-container'>
            <img style={{width:190, height:190}} src={ClickToCart}></img>
        </div>
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div id='errorDiv'>
                <div className='text-white border border-error bg-error w-fit p-4 my-2'>
                    {/* if there is an error, set a bootstrap alert with the error*/}
                    {error && <Alert variant='danger'>{error}</Alert>}
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
                <p className='py-2'>
                    {/* '/' indiciates link will take us to home page */}
                    Already have an account?
                    <Link to='/' className='underline' >Sign in</Link>
                </p>
            </div>

            {/*form to sign up*/}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Email Address</label>
                    {/* on change, set email to the target of the event value*/}
                    <input onChange={(e)=>setEmail(e.target.value)} className='border p-3' type='email'/>
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} className='border p-3' type='password' />
                </div>
                <button disabled={loading} className='text-white border border-mainBlue bg-mainBlue hover:bg-hoverBlue w-full p-4 my-2 '>
                    Sign Up
                </button>
            </form>

        </div>
    </>
  )
}

export default Signup