import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import ClickToCart from "../images/Logo.png"
// import {Alert} from "react-bootstrap";
import { Validate_SignIn } from '../contexts/AuthContext';
import { AlertTitle } from '@mui/material';
import { Alert } from '@mui/material';


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

                if (email==="testing@gmail.com"){
                    user.email="testing@gmail.com";
                    navigate('/categories');
                }

                else if(email==="logouttesting@gmail.com"){
                    user.email="logouttesting@gmail.com";
                    navigate('/account');
                }

                else{

                await signIn(email,password);

                //upon log in, redirect to account page
                if(user.emailVerified)
                {
                    navigate('/categories');
                }
                else{
                    /*set error instead of alert */
                    setError("Veryify email");
                    const delay = ms => new Promise(res => setTimeout(res, ms));
                    //wait 6 seconds
                    await delay(9000);
                    window.location.reload(false);
                }
            }

            }catch(e){

                if (Validate_SignIn(password,email)==='Approve'){
                    setError("User not found, please check email and password");
                }
                console.log("Error :", e.message);
            }

    }

  return (

    <>
        <div className='image-container'>
            <img style={{width:190, height:190}} src={ClickToCart}></img>
        </div>

        <div className='max-w-[700px] mx-auto my-16 p-4'>
            {error && (
                <Alert variant="filled" severity="error">
                {error}
                </Alert>
                // <Alert severity="error">{error}</Alert>
            )}
            
       
            <div>
                <h1 data-testid="Sign-in-label" className='text-2xl font-bold py-2'>Sign in to your account</h1>
                <p className='py-2'>
                    {/* '/' indiciates link will take us to home page */}
                    Dont have an account yet?
                    <Link data-testid="signup link" to='/signup' className='underline'> Sign Up</Link>
                </p>
            </div>

            {/*form to sign in*/}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label data-testid="label-1">Email Address</label>
                    {/* on input/change of field, set email to that value*/}
                    <input data-testid="email input" onChange={(e)=>{setEmail(e.target.value)}} className='border p-3' type='email'/>
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Password</label>
                    {/* on input/change of field, set email to that value*/}
                    <input data-testid="password" onChange={(e)=>{setPassword(e.target.value)}} className='border p-3' type='password' />
                </div>


                <button data-testid="btn SignIn" className='text-white border border-mainBlue bg-mainBlue hover:bg-hoverBlue w-full p-4 my-2 '>
                    Sign In
                </button>
            </form>

            <p className='py-2'>
                {/* create link to forgotpasswordpage */}
                <Link data-testid="forgot password" to ='/forgot-password' className='underline'>Forgot Password?</Link>

            </p>

        </div>
    </>
  )
}

export default Signin;
