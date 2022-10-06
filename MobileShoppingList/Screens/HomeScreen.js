import { StyleSheet, Text, TouchableOpacity,SafeAreaView, View,ScrollView,Image, Button, Pressable, ImageBackground} from 'react-native'
import React, { useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import CategoryItems from '../categoryBoxes/catBoxes'
import Dairy from '../images/dairy.webp';
import Chocolate from '../images/chocolate.jpeg' 
import Drinks from '../images/drinks.jpeg'
import Meat from '../images/meat.jpeg'
import ReadyMade from '../images/readyMade.webp'
import Toiletries from '../images/Toiletries.jpeg'
import Veggies from '../images/vegetables.jpeg'



const HomeScreen = () => {

  const navigation = useNavigation();

  const dataTopProducts = [
    {
      name: 'Rump Steak',
      //icon: IL_Grapes_PNG,
      bgColor: 'rgba(227,206,243,0.5)',
      price: 1.53,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Fanta Grape',
      //icon: IL_Greentea_PNG,
      bgColor: 'rgba(187, 208, 136, 0.5)',
      price: 1.53,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Low Fat Milk',
      //icon: IL_Cauliflawer_PNG,
      bgColor: 'rgba(140, 250, 145,0.5)',
      price: 1.53,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Mint Bubbly',
      //icon: IL_Grapes_PNG,
      bgColor: 'rgba(227,206,243,0.5)',
      price: 1.53,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Hand Soap',
      //icon: IL_Tomato_PNG,
      bgColor: 'rgba(255, 234, 232, 0.5)',
      price: 1.53,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Cucumber',
      //icon: IL_Greentea_PNG,
      bgColor: 'rgba(187, 208, 136, 0.5)',
      price: 1.53,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
   
  ];

 


 

 
  
  //function to handle logout of account
  //function called in onPress of logout button
  const handleLogOut = () => {

    auth.signOut().then( () => {
      navigation.navigate("Login");
    })

    .catch(error => alert(error.message))

  }





  return (

  
      
      
    <SafeAreaView style = {styles.flex}>
      
      <ScrollView>
        <View>
       
          <Text style = {styles.title}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator = {false} style = {styles.scrollViewCategories}>
            <CategoryItems
              icon={Dairy}
              text="Dairy"
              onPress={() => navigation.navigate("Dairy")}
              
            
            /> 
            <CategoryItems
              icon={Chocolate}
              text = "Sweets"
              onPress={() => navigation.navigate("Sweets")}

            
            /> 
            <CategoryItems
              icon={Meat}
              text = "Meat"
              onPress={() => navigation.navigate("Meat")}
            
            /> 
            <CategoryItems
              icon={Drinks}
              text = "Drinks"
              onPress={() => navigation.navigate("Drinks")}
            
            /> 
            <CategoryItems
              icon={ReadyMade}
              text = "Ready Made"
              onPress={() => navigation.navigate("ReadyMade")}
            
            /> 
            <CategoryItems
              icon={Toiletries}
              text = "Toiletries"
              onPress={() => navigation.navigate("Toiletries")}
            
            /> 
            <CategoryItems
              icon={Veggies}
              text = "Vegetables"
              onPress={() => navigation.navigate("Vegetables")}
            
            /> 

          </ScrollView>
       
        </View>
      </ScrollView>
      <TouchableOpacity
      onPress={handleLogOut}
      style={[styles.button,styles.buttonOutline,styles.container]}
      >
        <Text style={styles.buttonText}>Logout</Text>

      </TouchableOpacity>
      

    
    </SafeAreaView>
    
   
  )
}

export default HomeScreen


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