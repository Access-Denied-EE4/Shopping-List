import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import ClickToCart from "../images/CTCC.jpg"
import {Alert} from "react-bootstrap";
import { Validate_SignIn } from '../contexts/AuthContext';

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

        if (Validate_SignIn(password,email)!=='Approve'){
            setError(Validate_SignIn(password,email));
        }

            try{
                console.log(email);
                //wait for call to signIn function with set email and password
                //sigIn executes in the AuthContext file
                await signIn(email,password);
                //upon log in, redirect to account page
                if(user.emailVerified)
                {
                    navigate('/categories');
                }
                else{
                    alert("Veryify email");
                    const delay = ms => new Promise(res => setTimeout(res, ms));
                    //wait 6 seconds
                    await delay(6000);
                    window.location.reload(false);
                }

            }catch(e){
                if (Validate_SignIn(password,email)==='Approve'){
                    setError("User not found, please check email and password");
                }

                console.log(e.message);
            }

    }

  return (

    <>
        <div className='image-container'>
            <img style={{width:150, height:150}} src={ClickToCart}></img>
        </div>

        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div id='errorDiv'>
                <div className='text-white border border-error bg-error w-fit p-4 my-2'>
                    {/* if there is an error, set a bootstrap alert with the error*/}
                    {error && <Alert variant='danger'>{error}</Alert>}
                </div>
            </div>
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


                <button className='text-white border border-mainBlue bg-mainBlue hover:bg-hoverBlue w-full p-4 my-2 '>
                    Sign In
                </button>
            </form>

            <p className='py-2'>
                {/* create link to forgotpasswordpage */}
                <Link to ='/forgot-password' className='underline'>Forgot Password?</Link>

            </p>

        </div>
    </>
  )
}

export default Signin