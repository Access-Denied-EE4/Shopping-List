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

LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core']);

//Stack Navigator provides a way for the app to transition between screens where each new screen is placed on top of a stack
//each new screen created will be added to the stack and given a anme so it can be navigated to
const Stack=createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen options={{headerShown:false }} name="Login" component={LoginScreen}/>
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
    <Stack.Screen name="SignUp" component={SignUpScreen}/>

    </Stack.Navigator>
  </NavigationContainer>
  );
}

