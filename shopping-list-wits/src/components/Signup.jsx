import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {UserAuth} from '../contexts/AuthContext';

const Signup = () => {

    //setup states for email and password
    //set to empty string by default as no email/password by default
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    //error state-> allows us to set errors on the screen
    //also empty string as no errors bu default
    const [error,setError]=useState('');


    //set the imported fucntion from the AuthContext file
    const {createUser}= UserAuth()

    //handle submit function
    //async as waits for submit button to be pressed
    //pass event e so page dosent refresh when hit submit
    const handleSubmit= async (e)=>{
        //prevents page from refreshing when you submit
        e.preventDefault();
        //make sure error is emoty string as no current error
        setError('');

        try{
            await createUser(email,password);

        }catch(e){
            setError(e.message);
            console.log(e.message);
        }

    }

  return (

    //outer container
    <div className='max-w-[700px] mx-auto my-16 p-4'>
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

            <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                Sign Up
            </button>
        </form>

    </div>
  )
}

export default Signup