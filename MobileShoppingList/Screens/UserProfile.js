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
      
  
  
    },
    button: {
  
      
      width:'30%',
      height:'5%',
      borderRadius:10,
      alignItems:'center',
      marginTop: 10,
      padding:5,
      
     
      
      
     
  
    },
    buttonText: {
  
      color: 'black',
      fontWeight: '700',
      fontSize:16,
  
    },
    
    buttonOutline:{
      backgroundColor:'white',
    
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

  })