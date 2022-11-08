import React, { useEffect, useState } from 'react';
import {Alert, Box, Button, Collapse, IconButton} from '@mui/material';
import { UserAuth } from '../contexts/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import {Close} from '@mui/icons-material'
import {useNavigate } from 'react-router-dom';
import {Card, Form} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Verification = () => {

    //get user info object from auth g=context
    const {user}=UserAuth();

    //state for open, set to true by default
    const [open,setOpen]=useState(true);
    //set state for verufy button, not clicked by default
    const [isClicked, setIsClicked]=useState(false);

    //get a refrnece to our routing via navigate
    const navigate=useNavigate();

    const notify=()=>{

        toast("Verification Email Sent",{
        autoClose: 3500,
        theme: "dark",
        });
    }

    //handle waiting for user to verify email
    //async funcrion to allow await
    const handleEmailVerWait= async ()=>{
        const delay = ms => new Promise(res => setTimeout(res, ms));
        //wait 15 seconds
        await delay(15000);
        //naviagte to sign in page
        navigate('/');

        //refresh page to reflect email verification
        window.location.reload(false);


    }

    //async function for verifying
    const verify =async ()=>{
        //set clicked to true
        setIsClicked(true);

        if (user?.emailVerified===undefined){
            navigate('/');

            console.log("test email");
        }

        else{
            //send the verification email
        try{
            await sendEmailVerification(user);
            notify();
            //notifys user of addigt to cart
            //naviagte back to sign in page
            //navigate('/');
        }catch(e){
            console.log(e.message);
        }

        //call handle the email wait function
        handleEmailVerWait()
        }
    }

  return (
    <>
   {( user?.emailVerified===false || user?.emailVerified===undefined) &&(
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-2xl font-bold py-2 text-center'>Please verify your account to complete Sign up!</h1>
                <p className='py-2 text-center'>
                    If this is your first time Signing Up with us the verification
                    email will be in your spam inbox so please be sure to check!
                </p>
            </div>
                <button data-testid="verify btn" onClick={verify} disabled={isClicked} className='text-white border border-mainBlue bg-mainBlue hover:bg-hoverBlue w-full p-4 my-2 '>
                   Verify
                </button>
        </div>


    )}
    <ToastContainer newestOnTop />
    </>
  )
}

export default Verification