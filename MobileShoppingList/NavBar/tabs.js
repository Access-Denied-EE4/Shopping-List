import {  createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeScreen from '../Screens/HomeScreen';
import UserProfile from '../Screens/UserProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const tabs = () => {




  return (

    <Tab.Navigator
    //Customise the navigation bar  
    screenOptions={({ route }) => ({
       
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          //choose the icons for the different tabs
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'person-outline';
          }
          
          //style the icons themselves
          return <Ionicons name={iconName} size={size} color={color} style = {{ position: 'absolute', top: '50%'}} />;

          
         
        },

        tabBarActiveTintColor: '#21286B',
        tabBarInactiveTintColor: 'gray',
        //style the actual Navabr itself
        tabBarStyle: {
          bottom: 10,
          borderRadius: 30,
          marginHorizontal: 20,
          marginVertical: 20,
          backgroundColor: '#E7E7E7',
         
         
          
        },
        tabBarShowLabel: false,
      
        
      })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
    
  )
}

export default tabs