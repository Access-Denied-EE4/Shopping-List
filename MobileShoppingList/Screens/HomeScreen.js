import { StyleSheet, Text, TouchableOpacity, View,ScrollView,Image, Button, Pressable, ImageBackground} from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import Dairy from '../images/dairy.webp';
import Chocolate from '../images/chocolate.jpeg' 
import Drinks from '../images/drinks.jpeg'
import Meat from '../images/meat.jpeg'
import ReadyMade from '../images/readyMade.webp'
import Toiletries from '../images/Toiletries.jpeg'
import Veggies from '../images/vegetables.jpeg'


const HomeScreen = () => {

  const navigation = useNavigation();

  const logoPic = require("../images/ClickToCart.jpg");
  

  const handleLogOut = () => {

    auth.signOut().then( () => {
      navigation.navigate("Login");
    })

    .catch(error => alert(error.message))

  }





  return (

  
      
      
    <View>

     
  

        <ScrollView>
       

        <Pressable
          onPress = {handleLogOut}
          style = {[styles.button,styles.container]}
          hitSlop={{top: 50, bottom: 150, left: 50}}
         
        >

          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
     
       
        <Image style ={[styles.image]} source = {Dairy}></Image>
        <Image style ={[styles.image]} source = {Chocolate}></Image>
        <Image style ={[styles.image]} source = {Drinks}></Image>
        <Image style ={[styles.image]} source = {Meat}></Image>
        <Image style ={[styles.image]} source = {ReadyMade}></Image>
        <Image style ={[styles.image]} source = {Toiletries}></Image>
        <Image style ={[styles.image]} source = {Veggies}></Image>
    
     
        </ScrollView>

    </View>
    
   
  )
}

export default HomeScreen

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

    color: 'white',
    fontWeight: '700',
    fontSize:16,

  },
  image: {
    flex: 1,
    width: 350,
    height: 350,
    resizeMode: 'contain' ,
    left: 20,
   
  },
 
  
 

 

})