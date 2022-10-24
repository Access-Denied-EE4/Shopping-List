import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';


const catBoxes = ({icon, onPress}) => {
 {/*Creation of the category component. In essence it is TouchableOpacity button which takes in text,icon and onpress paramters. 
    All these parameters combine to form a TouchableOpacity that appears as an image, has text for the title of the category and an onPress method connected to it
  */}
  return (
   
   <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapperImg}>
        <Image 
          source={icon}
          style = {styles.image}
        
        />

        </View>
    </TouchableOpacity>
  );
};

export default catBoxes;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
   
  },
  wrapperImg: ({
    height: 50,
    width: 50,
   
   
  }),
 
  image: {
    
    marginTop: 10,
    
    width: 40,
    height: 40,

}


});