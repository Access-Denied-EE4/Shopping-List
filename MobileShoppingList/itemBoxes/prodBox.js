import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import Plus_Sign from '../images/plus.png';



const catBoxes = ({text, icon, onPress,id}) => {
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
      <TouchableOpacity onPress={onPress} key={id} className={id}>
        <Image style = {styles.prodBox} source={Plus_Sign} />
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
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: "row",
   
    
  }),
  text: {
    marginTop: 20,
    color: "#000000",
    fontSize: 20,
    
  },
  image: {
    
    width:250,
    height:250,
    resizeMode: 'cover',
    margin:8,
    borderRadius: 10,
   
},
prodBox: {
    width: 40,
    height: 40,
    left: '45%',
    bottom: '80%'
}


});
