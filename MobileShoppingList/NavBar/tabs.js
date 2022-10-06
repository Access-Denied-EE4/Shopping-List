import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeScreen from '../Screens/HomeScreen';
import UserProfile from '../Screens/UserProfile';


const Tab = createBottomTabNavigator();

const tabs = () => {




  return (

    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
    
  )
}

export default tabs