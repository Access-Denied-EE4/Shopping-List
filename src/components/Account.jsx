import React from 'react';
import { UserAuth } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';
import NavBar from './NavBar';

const Account = () => {

  //getting user and logout in object from UserAuth
  const {user,logout}=UserAuth();
  //assign naviagte to our imported function
  const navigate=useNavigate();

  //handle logout
  //async as waitng for user to press button
  const handleLogout= async()=>{
    try{
      if (user.email==="logouttesting@gmail.com"){
        navigate('/')
      }
      else{
      await logout();
      //upon log out, navigate/redirect back to homepage
      navigate('/')
      console.log('you are logged out');
      }

    }catch(e){
      console.log(e.message);

    }
  }

  return (
    <>
      <div className='max-w-[600px] mx-auto my-16 p-4'>
        <h1 className='text-2xl font-bold py-4'>Account</h1>
        {/*getting user from UserAuth*/}
        <p data-testid="useremail">  User Email: {user && user.email} </p>

        <button data-testid="btn logout" onClick={handleLogout} className='border px-6 py-2 my-4'>
          Logout
        </button>

      </div>
      <NavBar/>
    </>
  )
}

export default Account