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
   
    alignItems: 'center',
    marginRight: 17,
    marginHorizontal: 16,
    marginVertical: 30,
   
  },
  wrapperImg: ({
    height: 210,
    width: 210,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: 'wrap',
   
    
  }),
  text: {
    marginTop: 20,
    color: "#000000",
    fontSize: 20,
    
  },
  image: {
    
    flex: 1,
    width: 180,
    height: 180,
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
