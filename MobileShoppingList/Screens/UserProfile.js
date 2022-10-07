import React from 'react'
import {  Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'

const UserProfile = () => {

    const navigation = useNavigation();
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
                style={[styles.button,styles.buttonOutline]}
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
  
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      color: "#2A2C41", 
      
  
  
    },
    button: {
  
      
      width:'40%',
      height:'7%',
      borderRadius:10,
      alignItems:'center',
      marginTop: 10,
      padding:5,
      bottom:-10,
      backgroundColor: "#2A2C41",  
     
      
      
     
  
    },
    buttonText: {
  
      color: 'white',
      fontWeight: '700',
      fontSize:16,
  
    },
    
    buttonOutline:{
     
      backgroundColor: "#2A2C41", 
      borderWidth: 2,
    },
  
    title:{
      fontSize: 18,
      color: "#2A2C41", 
      fontWeight: '700',
      color: "0818F5",
      marginTop: 20,
    },

  })