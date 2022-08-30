import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';


const Signin = () => {


    //setup states for email and password
    //set to empty string by default as no email/password by default
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    //error state-> allows us to set errors on the screen
    //also empty string as no errors bu default
    const [error,setError]=useState('');

    //define signIn from userAuth (the function we made there to sign in)
    const {signIn,user}=UserAuth();


    //assign naviagte to the use navigate function
    const navigate=useNavigate();

    //async function as need to wait for user to click sign in
    const handleSubmit = async (e)=>{
        //do not want page refreshing on submit
        e.preventDefault();
        // set error to empty string as no error by default
        setError('');

        try{
            //wait for call to signIn function with set email and password
            //sigIn executes in the AuthContext file
            await signIn(email,password);
            //upon log in, redirect to account page
            if(user.emailVerified)
            {
                navigate('/account');
            }
            else{
                alert("Veryify email");
                const delay = ms => new Promise(res => setTimeout(res, ms));
                //wait 6 seconds
                await delay(6000);
                window.location.reload(false);
            }

        }catch(e){
            setError(e.message);
            console.log(e.message);
        }
    }

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
        <div>
            <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
            <p className='py-2'>
                {/* '/' indiciates link will take us to home page */}
                Dont have an account yet?
                <Link to='/signup' className='underline'> Sign Up</Link>
            </p>
        </div>

        {/*form to sign in*/}
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Email Address</label>
                {/* on input/change of field, set email to that value*/}
                <input onChange={(e)=>{setEmail(e.target.value)}} className='border p-3' type='email'/>
            </div>

            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Password</label>
                {/* on input/change of field, set email to that value*/}
                <input onChange={(e)=>{setPassword(e.target.value)}} className='border p-3' type='password' />
            </div>


            <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                Sign In
            </button>
        </form>

    </div>
  )
}

export default Signin