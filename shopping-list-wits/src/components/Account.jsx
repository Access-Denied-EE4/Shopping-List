import React from 'react'
import { UserAuth } from '../contexts/AuthContext'

const Account = () => {

  //getting user and logout in object from UserAuth
  const {user,logout}=UserAuth();

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      {/*getting user from UserAuth*/}
      <p>User Email: {user && user.email} </p>

      <button className='border px-6 py-2 my-4'>
        Logout
      </button>

    </div>
  )
}

export default Account