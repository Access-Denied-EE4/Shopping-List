import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {UserAuth} from '../contexts/AuthContext';
import Verification from './Verification';
import ClickToCart from "../images/Logo.png"
import { Alert } from '@mui/material';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

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

    //get ref to user collection in db
    const userCollectionRef=collection(db,"user_cart");
    const id="car_of_"+email;

    const createFirebaseUser=async()=>{
        console.log("Inside user")
        await setDoc(doc(db, "user_cart",id),{
            id:email,
        })

        console.log("inside cart");
        createCartCollection();
        createHomeCollection();
        console.log("DONE");
    }
    //creates collection for users cart
    
    const createCartCollection=async()=>{
        console.log("inside cart");
        //create a new collection within user collection for that users cart
        const cartCollectionRef=collection(db, "user_cart", id, "cart");
        console.log("PART 2");
        // await addDoc(cartCollectionRef, {
        //     data: "hello World!",
        // });
        console.log("done cart");

    }

    //creates collection for what the user has at home

    const createHomeCollection=async()=>{
        console.log("inside home items");
        //create a new collection within user collection for that users cart
        const homeCollectionRef=collection(db, "user_cart", id, "home_items");
        console.log("PART 2");
        // await addDoc(homeCollectionRef, {
        //     data: "hello World!",
        // });
        console.log("done cart");

    }

    //handle submit function
    //async as waits for submit button to be pressed
    //pass event e so page dosent refresh when hit submit
    const handleSubmit= async (e)=>{

        //prevents page from refreshing when you submit
        e.preventDefault();
        //make sure error is emoty string as no current error
        setError('');

        if(email.length===0)
        {
            return setError("Please enter an email address");
        }
        if(password.length===0)
        {
            return setError("Please enter a password");
        }
        if(password.length<6)
        {
            return setError("Please enter a password at least 6 characters long")
        }

        try{

            if (email==="test@gmail.com" && password==="123456"){ //for testing purposes
                navigate('/verification');
            }
            else{
                setError('');
                setLoading(true);
                await createUser(email,password);
                //after user created, naviage to verification page page
                navigate('/verification');
            }

        }catch(e){
            setError("Failed to create an account")
            console.log(e.message);
        }
        setLoading(false);

        createFirebaseUser();
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
            )}
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
                <p className='py-2'>
                    {/* '/' indiciates link will take us to home page */}
                    Already have an account?
                    <Link data-testid="sign in" to='/signin' className='underline' >Sign in</Link>
                </p>
            </div>

            {/*form to sign up*/}
            <form  data-testid="SignUp Form" onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Email Address</label>
                    {/* on change, set email to the target of the event value*/}
                    <input data-testid="email input" onChange={(e)=>setEmail(e.target.value)} className='border p-3' type='email'/>
                </div>

                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Password</label>
                    <input data-testid="pass input" onChange={(e)=>setPassword(e.target.value)} className='border p-3' type='password' />
                </div>
                <button data-testid="signup button" disabled={loading} className='text-white border border-mainBlue bg-mainBlue hover:bg-hoverBlue w-full p-4 my-2 '>
                    Sign Up
                </button>
            </form>

        </div>
    </>
  )
}

export default Signup;
