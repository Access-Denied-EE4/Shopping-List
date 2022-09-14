import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native'
import React, { useEffect, useState } from 'react'
import {auth} from '../firebase'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'


const SignUpScreen = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.replace("Home")
            }
        })
        

        return unsubscribe;
    }, [])

    
    
    const handleSignUp=()=>{
        createUserWithEmailAndPassword(auth,email,password).then(userCredentials=>{
            const user=userCredentials.user;
            console.log('Signed up with: ',user.email);
        })
        .catch(error=>alert(error.message))
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
        backgroundColor:'#0782F9',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center'
    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop:5,
        borderColor:'#0782F9',
        borderWidth: 2,
    },
    buttonText:{
        color: 'black',
        fontWeight: '700',
        fontSize:16,
    },
    buttonOutlineText:{
        color: '#0782F9',
        fontWeight: '700',
        fontSize:16,
    },
    title:{
        justifyContent: 'center',
        alignItems: 'stretch',
        fontWeight: '800',
        marginBottom: 40,
    }


})