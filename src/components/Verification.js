import React, { useEffect, useState } from 'react';
import {Alert, Box, Button, Collapse, IconButton} from '@mui/material';
import { UserAuth } from '../contexts/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import {Close} from '@mui/icons-material'
import {useNavigate } from 'react-router-dom';

const Verification = () => {

    //get user info object from auth g=context
    const {user}=UserAuth();

    //state for open, set to true by default 
    const [open,setOpen]=useState(true);
    //set state for verufy button, not clicked by default 
    const [isClicked, setIsClicked]=useState(false);

    //get a refrnece to our routing via navigate
    const navigate=useNavigate();

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

        //send the verification email
        try{
            await sendEmailVerification(user);
            console.log("Successfully sent email");
            console.log(user.email);
            //naviagte back to sign in page
            //navigate('/');
        }catch(e){
            console.log(e.message);
        }

        //call handle the email wait function
        handleEmailVerWait()

    }

  return (
    //if user has not verified the account, show this.
    user?.emailVerified===false &&(        
        <Box>
            {/* open is a sate that contolles state of open or closed*/}
            <Collapse in={open}>
                <Alert 
                severity='warning' 
                action={
                    <IconButton
                    aria-label='Close'
                    size='small'
                    onClick={()=>setOpen(false)}>
                        <Close fontSize="inherit"/>
                    </IconButton>
                }
                sx={{mb:3}}
                >
                    Your email has not been verified
                    <Button
                    size='small'
                    onClick={verify}
                    disabled={isClicked}
                    sx={{lineHeight: "initial"}}>
                        veryify 
                    </Button>
                </Alert>
            </Collapse>
        </Box>
    )
  )
}

export default Verification