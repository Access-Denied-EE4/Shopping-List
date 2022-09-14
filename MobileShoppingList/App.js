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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
