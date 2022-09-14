import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'

const HomeScreen = () => {

  const navigation = useNavigation();

  const handleLogOut = () => {

    auth.signOut().then( () => {
      navigation.replace("Login");
    })

    .catch(error => alert(error.message))

  }





  return (
    <View style = { styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress = {handleLogOut}
        style = {styles.button}
      >

        <Text style = {styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  button: {

    backgroundColor:'#0782F9',
    width:'100%',
    padding:15,
    borderRadius:10,
    alignItems:'center',
    marginTop: 40,

  },
  buttonText: {

    color: 'black',
    fontWeight: '700',
    fontSize:16,

  },

})