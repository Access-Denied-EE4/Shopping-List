import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import Minus_Sign from '../images/minus_sign.png';



const catBoxes = ({text, icon, onPress}) => {
 {/*Creation of the category component. In essence it is TouchableOpacity button which takes in text,icon and onpress paramters. 
    All these parameters combine to form a TouchableOpacity that appears as an image, has text for the title of the category and an onPress method connected to it
  */}

  return (
   
   <TouchableOpacity style={styles.container}>
      <View style={[styles.wrapperImg]}>
        <Image 
          source={icon}
          style = {styles.image}
        
        />

        </View>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Image style = {styles.prodBox} source={Minus_Sign} />
      </TouchableOpacity>
      
    </TouchableOpacity>
  );
};

export default catBoxes;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 17,
    marginHorizontal: 16,
    marginVertical: 40,
   
  },
  wrapperImg: ({
    height: 210,
    width: 210,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    
  }),
  text: {
    marginTop: 10,
    color: "#000000",
    fontSize: 20,
    
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
},
prodBox: {
    width: 40,
    height: 40,
    left: '40%',
    bottom: '80%'
}


});
