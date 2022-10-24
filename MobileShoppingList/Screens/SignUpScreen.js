import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native'
import React, { useEffect, useState } from 'react'
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { useNavigation } from '@react-navigation/core'
import {addDoc, collection, doc,setDoc} from 'firebase/firestore';
import {auth, db} from '../firebase';

const SignUpScreen = () => {

    //setup states for email and password
    //set to empty string by default as no email/password by default
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    

    const navigation = useNavigation();

     //get ref to user collection in db
     const userCollectionRef=collection(db,"user_cart");
     const id="car_of_"+email;
 
     const createFirebaseUser=async()=>{
         console.log("Inside user")
         await setDoc(doc(db, "user_cart",id),{
            id:email,
         })
 
         console.log("inside cart");
         createCartCollection();
         console.log("DONE");
     }

    const createCartCollection=async()=>{
        console.log("inside cart");
        //create a new collection within user collection for that users cart
        const cartCollectionRef=collection(db,"user_cart",id,"cart")
        console.log("Cart Created");
        await addDoc(cartCollectionRef, {
            data: "hello World!",
        });
        console.log("done cart");

    }

    //when state changed or after rendering will call this 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {

            console.log(currentUser);
            
           
        });
        
       
        return () => {
            unsubscribe();
        }

       
          
      
    }, []);

    
    //function to handle sign up
    const handleSignUp = () =>{
        
        createFirebaseUser();
    
        createUserWithEmailAndPassword(auth,email,password).then((userCredentials) =>{
            sendEmailVerification(userCredentials.user);
           
        })
        .catch(alert);

        
        navigation.navigate("Login")
        
       

    

    }


  return (

    <KeyboardAvoidingView
    style={styles.container}
    >

    <View>

    <Text style={styles.title}>Sign Up</Text>
    


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
            onPress={handleSignUp}
            style={[styles.button,styles.buttonOutline]}
        >
        <Text style={styles.buttonText}>SignUp</Text>

        </TouchableOpacity>
    </View>

    </KeyboardAvoidingView>
    
  )
}

export default SignUpScreen

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
        backgroundColor: "#2A2C41",
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center'
    },
    buttonOutline:{
        
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
    title:{
        color:"#2A2C41",
        justifyContent: 'center',
        alignItems: 'stretch',
        fontWeight: '800',
        marginBottom: 40,
    }


})