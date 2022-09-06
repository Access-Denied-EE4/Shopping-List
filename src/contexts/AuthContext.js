import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { signOut } from 'firebase/auth'
//checks if logged in therefore have access to protected routes

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase';
import { sendPasswordResetEmail } from "firebase/auth";


const UserContext = createContext();

//takes in children
export const AuthContextProvider = ({ children }) => {

    //need state for access
    //use state takes in obkect->{}
    const [user, setUser] = useState({});

    //create a new user function
    const createUser = (email, password) => {
        //firebase function for creating user
        return createUserWithEmailAndPassword(auth, email, password);

    };

    //login function
    const signIn = (email, password) => {
        //firebase function for loggin in
        return signInWithEmailAndPassword(auth, email, password);
    }

    //logout function
    const logout = () => {
        //firbase function for logging out
        return signOut(auth);
    }


    //forgotpasswordFunction
    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    /*use onAuthStateChange-> put inside useEffect as only want it to run once when

    /*use onAuthStateChange-> put inside useEffect as only want it to run once when

      component mounts*/
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        //this is where we export all our values/functions-imported via UserAuth and accessed as objects
        <
        UserContext.Provider value = {
            { createUser, user, logout, signIn, forgotPassword }
        } > { children } < /UserContext.Provider>
    )
}



export const UserAuth = () => {
        //this is what makes context avaliable
        return useContext(UserContext)
    }
    //Validate password for new user -> exported to be tested
export const Passwords_Match = (password, rep_password) => password === rep_password;
export const Valid_Email = (email) => email.includes("@");
export const Email_Entered = (email) => email !== "";
export const Pass_Entered = (password) => password !== "";
export const Approve_Sign_in = (email, password) => email !== "" && password !== "";
export const CheckPassLength = (password) => password.length >= 6;
export const Validate_SignIn = (password, email) => {


    if (!Approve_Sign_in(password, email)) {

        if (!Email_Entered(email) && Pass_Entered(password)) {
            return 'Please enter an email address.'
        } else if (Email_Entered(email) && !Pass_Entered(password)) {

            return 'Please enter your password.'
        } else if (!Email_Entered(email) && !Pass_Entered(password)) {
            return 'Please enter an email address and password.';

        }
    } else {
        return 'Approve';
    }

}