import React from 'react';
import {Navigate} from 'react-router-dom';
import {UserAuth} from '../contexts/AuthContext';

//if user not logged in, they mustn have access to other files such as accounts
//therefore if not a logged in user, redirect them to home page which is the signin page 

const ProtectedRoute = ({children}) => {

    //define user-retrive user object({}) from UserAuth
    const {user}=UserAuth();

    //if no user is logged in, return to homepage (signin page)
    if(!user)
    {
        return <Navigate to='/'/>
    }

    return children
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute