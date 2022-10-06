import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';


const catBoxes = ({text, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapperImg}>
        <Image 
          source={icon}
          style = {styles.image}
        
        />

        </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default catBoxes;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 17,
  },
  wrapperImg: ({
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }),
  text: {
    marginTop: 10,
    color: "#000000",
    fontSize: 14,
    
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 400 / 2,
    resizeMode: "cover",
}


});