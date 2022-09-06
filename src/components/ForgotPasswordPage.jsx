import React, {useState} from 'react';
import { UserAuth } from '../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom';



const ForgotPasswordPage = () => {



    //setup states for email and password
    //set to empty string by default as no email/password by default
    const [email,setEmail]=useState('');
   //define forgotpassword from userAuth (the function we made there to resetpassword)
    const {forgotPassword} = UserAuth();
    //assign naviagte to the use navigate function
    const navigate=useNavigate();
   
    //error state-> allows us to set errors on the screen
    //also empty string as no errors bu default
    const[error, setError] = useState('');
    
    
    

   




    const handleSubmit = async (e)=>{

        e.preventDefault();
        setError("");
       
       
        try {

            //wait for call to forgotpassword function with email
            //forgotpassword executes in the AuthContext file
           
            await forgotPassword(email);
            
            //after putting in email to reset password will redirect back to sign in page
            navigate('/');
            
            
           
            
          } catch {
           
            console.log(e.message);
            
            
          }
          
        }

    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
        <div>
            <h1 className='text-2xl font-bold py-2'>Reset Password</h1>
            <p className='py-2'>
               
                Enter your email address below to reset your password!
               
            </p>
        </div>

        {/*form to reset password*/}
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col py-4'>
                <label className='py-2 font-medium'>Email Address</label>
                {/* on input/change of field, set email in block to that value*/}
                <input   name='email' type='email'autoComplete='email' required value={email}
                    onChange={e => setEmail(e.target.value)} className='border p-3' />
            </div>
    
           

            <button className='text-white border border-mainBlue bg-mainBlue hover:bg-hoverBlue w-full p-4 my-2'>
                Reset Password
            </button>

            <p className='py-2'>

            <Link to ='/' className='underline '>Sign In</Link>

            </p>
        
        </form>

    </div>
    )


    
}  

export default ForgotPasswordPage;

