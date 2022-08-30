import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {signOut} from 'firebase/auth'
//checks if logged in therefore have access to protected routes
import {onAuthStateChanged} from 'firebase/auth'
import{auth} from '../firebase';

const UserContext=createContext();

//takes in children
export const AuthContextProvider=({children})=>{

    //need state for access
    //use state takes in obkect->{}
    const [user,setUser]=useState({});

    //create a new user function
    const createUser=(email,password)=>{
        //firebase function for creating user
        return createUserWithEmailAndPassword(auth,email,password);

    };

    //login function
    const signIn=(email,password)=>{
        //firebase function for loggin in
        return signInWithEmailAndPassword(auth,email,password);
    }

    //logout function
    const logout=()=>{
        //firbase function for logging out
        return signOut(auth);
    }

    /*use onAuthStateChange-> put inside useEffect as only want it to run once when 
      component mounts*/
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            console.log(currentUser);
            setUser(currentUser);
        });
        return ()=>{
            unsubscribe();
        }
    },[]);

    return (
        //this is where we export all our values/functions-imported via UserAuth and accessed as objects
        <UserContext.Provider value={{createUser, user, logout, signIn}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth=()=>{
    //this is what makes context avaliable
    return useContext(UserContext)
}