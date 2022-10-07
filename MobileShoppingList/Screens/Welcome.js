import { StyleSheet, View, Text,Pressable} from 'react-native'
import React from 'react'
import {ImageBackground } from 'react-native';
import logo from '../images/Logo.png';
import wallpaper from '../images/wallpaper.webp';




const Welcome = ({navigation}) => {

  return (
    <View style={styles.screenContainer}>
    <ImageBackground source={wallpaper} resizeMode="contain" style={styles.Bgimage} >
       <ImageBackground source={logo} resizeMode="contain" style={styles.icon} >
        
        <Text style={styles.text1}>Welcome To</Text>
        <Text style={styles.text2}>Click To Cart</Text>
    
        </ImageBackground>
            <Text style={styles.text3}>Your gateway to a</Text>
            <Text style={styles.text4}>better shopping </Text>
            <Text style={styles.text5}>experience!</Text>
        </ImageBackground>

        <Pressable
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonTextStyle}>Start Shopping </Text>
        </Pressable>
      
           
       
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:"white",
    alignItems: 'center',
   
  },
  buttonStyle: {
    backgroundColor: "#2A2C41",  
    alignItems: 'center',
    justifyContent: 'center',   
    height: 54,
    width:180,
    bottom:80,
    left:-5,
    borderRadius: 8,
    marginHorizontal:20,
    marginVertical:10,
    borderWidth:1,
    borderColor:"white",
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(46, 229, 157, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: '700',
  },

  Bgimage: {

    aspectRatio:1,
  
    bottom:-80,

    width:'100%',
    height:'100%',

  
    justifyContent: "center"
  },
  text1: {
    
    top: 180,
    left:254, 
    color: "#2A2C41",
    positon:'absolute',
    flexDirection: 'row', 
    fontSize: 45,
    lineHeight: 84,
    fontWeight: "bold",
   
    
 
  },text2: {
    top: 150,
    
    left:244,
    color: "#2A2C41",
    positon:'absolute',
    flexDirection: 'row', 
    fontSize: 45,
    lineHeight: 84,
    fontWeight: "bold",
   
    
 
  },
  icon: {

    width:window.innerWidth,
    height:window.innerHeight,
    bottom:140,

  },text3: {
   
    top: 50,
    fontFamily:'serif',
    left:254,
    color: "#2A2C41", 
    fontSize: 28,
    lineHeight: 84,
    fontWeight: "bold",

  },text4: {
   
    top: 20,
    fontFamily:'serif',
    left:270,
    color: "#2A2C41", 
    fontSize: 28,
    lineHeight: 84,
    fontWeight: "bold",

  },text5: {
    fontFamily:'serif',
    top: -10,
    left:294,
    color: "#2A2C41", 
    fontSize: 28,
    lineHeight: 84,
    fontWeight: "bold",
  },
   
    
 
   
    
 
 
 
});

export default Welcome;

