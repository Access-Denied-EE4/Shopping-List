import React, {  useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth';
import { View,Text, StyleSheet,KeyboardAvoidingView,TextInput,TouchableOpacity } from 'react-native';
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/core'

const ForgotPasswordScreen = () => {

    const [email,setEmail]=useState('')
    const navigation = useNavigation();


    const handleForgotPassword=()=>{

        sendPasswordResetEmail(auth, email);
        console.log('Reset Password ');
        navigation.navigate("Login");


            
            
        
    }

  return (

    <KeyboardAvoidingView
    style={styles.container}
    >

    <View>

        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.title}>Enter the email below that you would like to reset the password for:</Text>


    </View>






    <View style={styles.inputContainer}>
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
        />

    </View>
    <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleForgotPassword}
                style={[styles.button,styles.buttonOutline]}
            >
            <Text style={styles.buttonText}>Reset Password</Text>

            </TouchableOpacity>
    </View>

    </KeyboardAvoidingView>
  
  )
}

export default ForgotPasswordScreen

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
        borderColor:'#585DA6',
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