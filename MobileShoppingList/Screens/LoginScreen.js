import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native'
import React, { useEffect, useState } from 'react'
import {auth} from '../firebase'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'
import { Link } from '@react-navigation/native';

const LoginScreen = () => {
    
    
    //setup states for email and password
    //set to empty string by default as no email/password by default
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    // create navigate variable to use the navigate function to travel between screens
    const navigation = useNavigation();
   //when state changed or after rendering will call this and handle navigation between screens
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.navigate("Login")
            }
        })
        

        return unsubscribe;
    }, [])
    
    //function to handle login events
    const handleLogin=()=>{
        //handle the login with email
        signInWithEmailAndPassword(auth,email,password).then(userCredentials=>{
            const user=userCredentials.user;
            //once logged in will take user to the home screen
            navigation.navigate("HomeScreen")
            console.log('Logged in with: ',user.email);
        })
        .catch(error=>alert(error.message))
    }



    return (
        <KeyboardAvoidingView
            style={styles.container}
        >

        <View>

        <Text style={styles.title}>Login</Text>
        </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.button,styles.buttonOutline]}
                >
                <Text style={styles.buttonText}>Login</Text>

                </TouchableOpacity>
              
            </View>

            <Link 

            style={styles.forgotPassword}

            to={{ screen: 'SignUp' }}>
                 Dont have an account yet? Sign Up!
            </Link>

            <Link 

            style={styles.forgotPassword}
            
            to={{ screen: 'ForgotPassword' }}>
                ForgotPassword?
            </Link>

    
        </KeyboardAvoidingView>
    )
}

export default LoginScreen


//styling for the elements on the page
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    inputContainer: {
        width :'80%',


    },
    input: {
        backgroundColor:'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5,
    },
    buttonContainer: {
        width:'60%',  
        justifyContent:'center',
        alignItem: 'center',
        marginTop:40,
    },
    button:{
        
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center'
    },
    buttonOutline:{
        backgroundColor: "#2A2C41",  
        marginTop:5,
       
        borderWidth: 2,
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize:16,
    },
    buttonOutlineText:{
        color: '#0782F9',
        fontWeight: '700',
        fontSize:16,
    },
    forgotPassword: {
        justifyContent:'center',
        alignItem: 'center',
        marginTop: 80,
        fontWeight: '700',
        color: "#2A2C41", 
        textDecorationLine: 'underline'
    },
    title:{
        color: "#2A2C41", 
        justifyContent: 'center',
        alignItems: 'stretch',
        fontSize:20,
        fontWeight: '800',
        marginBottom: 40,
    },
    


})