import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createFactory } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen'
import SignUpScreen from './Screens/SignUpScreen'
import { LogBox } from 'react-native';
import DairyProducts from './categoryPages/DairyProducts';
import SweetProducts from './categoryPages/SweetProducts';
import MeatProducts from './categoryPages/MeatProducts';
import DrinksProducts from './categoryPages/DrinksProducts';
import ReadyMadeProducts from './categoryPages/ReadyMadeProducts';
import ToiletryProducts from './categoryPages/ToiletryProducts';
import VegetableProducts from './categoryPages/VegetableProducts';
import Tabs from './NavBar/tabs';
import Welcome from './Screens/Welcome';
import UsersCart from './Screens/UserCart';
import { RootSiblingParent } from 'react-native-root-siblings';


LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core']);

//Stack Navigator provides a way for the app to transition between screens where each new screen is placed on top of a stack
//each new screen created will be added to the stack and given a anme so it can be navigated to
const Stack=createNativeStackNavigator();

function HomeScreenTabs() {
  return (
    <Tabs />
  );
}




export default function App() {
  return (
   
    <NavigationContainer>
      <RootSiblingParent>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown:false }} name= "Welcome" component={Welcome}/>
      <Stack.Screen options={{headerShown:false }} name="Login" component={LoginScreen}/>
      <Stack.Screen options={{headerShown:false }} name="HomeScreen" component={HomeScreenTabs}/>
      <Stack.Screen options={{headerShown:false }} name="ForgotPassword" component={ForgotPasswordScreen}/>
      <Stack.Screen options={{headerShown:false }} name="SignUp" component={SignUpScreen}/>
      <Stack.Screen options={{headerShown:false }} name="Dairy" component={DairyProducts}/>
      <Stack.Screen options={{headerShown:false }} name="Sweets" component={SweetProducts}/>
      <Stack.Screen options={{headerShown:false }} name="Meat" component={MeatProducts}/>
      <Stack.Screen options={{headerShown:false }} name="Drinks" component={DrinksProducts}/>
      <Stack.Screen options={{headerShown:false }} name="ReadyMade" component={ReadyMadeProducts}/>
      <Stack.Screen options={{headerShown:false }} name="Toiletries" component={ToiletryProducts}/>
      <Stack.Screen options={{headerShown:false }} name="Vegetables" component={VegetableProducts}/>
      <Stack.Screen options={{headerShown:false }} name="Cart" component={UsersCart}/>
      
    </Stack.Navigator>
      </RootSiblingParent>
    
  </NavigationContainer>

  
  );
}

