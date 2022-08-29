import { createContext, useContext } from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {signOut} from 'firebase/auth'
//checks if logged in therefore have access to protected routes
import {onAuthStateChanged} from 'firebase/auth'
import{auth} from '../firebase';

const UserContext=createContext();

//takes in children
export const AuthContextProvider=({children})=>{

    //create a new user function
    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);

    };


    return (
        //this is where we export all our values/functions
        <UserContext.Provider value={{createUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth=()=>{
    //this is what makes context avaliable
    return useContext(UserContext)
}