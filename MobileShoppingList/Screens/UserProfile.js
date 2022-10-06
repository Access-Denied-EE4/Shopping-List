import React from 'react'
import {  Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import { auth } from '../firebase'

const UserProfile = () => {

    const handleLogOut = () => {

        auth.signOut().then( () => {
          navigation.navigate("Login");
        })
    
        .catch(error => alert(error.message))
    
      }



  return (
   
    <View style={styles.container}>
        <Text> Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity
                onPress={handleLogOut}
                style={[styles.button,styles.buttonOutline,styles.container]}
            >
                <Text style={styles.buttonText}>Logout</Text>

            </TouchableOpacity>


    </View>





  )
}

export default UserProfile


//styling for the elements on the page
const styles = StyleSheet.create({

    container: {
  
      position: 'absolute',
      right: 5,
      top: 2,
  
  
    },
    button: {
  
      backgroundColor:'#2A2C41',
      width:'20%',
      padding:5,
      borderRadius:10,
      alignItems:'center',
      marginTop: 10,
      
      
     
  
    },
    buttonText: {
  
      color: 'black',
      fontWeight: '700',
      fontSize:16,
  
    },
    
    buttonOutline:{
      backgroundColor:'white',
      marginTop:5,
      borderColor:'#585DA6',
      borderWidth: 2,
    },
  
    title:{
      fontSize: 18,
      fontFamily: 'Helvetica',
      fontWeight: '700',
      color: "0818F5",
      marginTop: 20,
    },
    flex:{
      flex: 1,
  
  
    },
    scrollViewCategories: {
      paddingLeft: 20,
      marginTop: 20,
    },
   
    
   
  
   
  
  })