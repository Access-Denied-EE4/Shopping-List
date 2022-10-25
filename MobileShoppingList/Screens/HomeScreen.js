import { StyleSheet, Text, TouchableOpacity,SafeAreaView, View,ScrollView,Image, Button, Pressable, ImageBackground} from 'react-native'
import React, { useState,useEffect } from 'react'
import {collection, getDocs,addDoc,doc,increment, updateDoc} from 'firebase/firestore';
import {ref, getDownloadURL} from 'firebase/storage';
import {auth, db, storage} from '../firebase';
import { useNavigation } from '@react-navigation/core'
import CategoryItems from '../categoryBoxes/catBoxes'
import ItemsBox from '../itemBoxes/prodBox';
import Dairy from '../images/dairy.webp';
import Chocolate from '../images/chocolate.jpeg' 
import Drinks from '../images/drinks.jpeg'
import Meat from '../images/meat.jpeg'
import ReadyMade from '../images/readyMade.webp'
import Toiletries from '../images/Toiletries.jpeg'
import Veggies from '../images/vegetables.jpeg'
import Toast from 'react-native-root-toast';
import Milk from '../images/dairy-low-fat-milk.png';
import Coke from '../images/drink-soft-coke.jpeg';
import Pie from '../images/ready-chicken-pie.jpeg';
import Pizza from '../images/ready-pizza.png';
import Aero from '../images/sweet-aero.png';
import Jelly from '../images/sweet-jelly-tots.png';
import Soap from '../images/toilet-hand-soap.jpeg';
import Shampoo from '../images/toilet-shampoo.jpeg';
import Onion from '../images/veg-onion.jpeg';
import Potato from '../images/veg-potato.jpeg';




const HomeScreen = () => {

  

   const navigation = useNavigation();
   const [dairyItems, setDairyItems]=useState([]);
   //variable holding the refernce to the DB collection
   //pass in db variable from fireabse file, collection name in DB
   //collection is a firebase function
   const dairyItemsCollectionRef=collection(db, "dairy_items");
 
  
   //state for image, defualt is null
    const [url, setUrl]=useState([]);
 
  
 
 
 
   
  const addMilkToCart=async()=>{
    //add item to cart
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Low Fat Milk",
      img_url: "gs://shopping-list-wits.appspot.com/dairy/dairy-low-fat-milk.png",
      price: "20",
    })

    
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(20),
    })

    let toast = Toast.show('Low Fat Milk'+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  
  
  };
  
  const addCokeToCart=async()=>{
    //add item to cart
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Coke",
      img_url: "gs://shopping-list-wits.appspot.com/drink/drink-soft-coke.jpeg",
      price: "12",
    })

    
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(12),
    })

    let toast = Toast.show('Coke'+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  
  
  };
  
  const addPieToCart=async()=>{
    //add item to cart
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Chicken Pie",
      img_url: "gs://shopping-list-wits.appspot.com/ready/ready-chicken-pie.jpeg",
      price: "45",
    })

    
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(45),
    })

    let toast = Toast.show('Chicken Pie'+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  
  
  };
  
  const addPizzaToCart=async()=>{
    //add item to cart
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Frozen Pizza",
      img_url: "gs://shopping-list-wits.appspot.com/ready/ready-pizza.png",
      price: "70",
    })

    
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(70),
    })

    let toast = Toast.show('Frozen Pizza'+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  
  
  };
  
  const addAeroToCart=async()=>{
    //add item to cart
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Aero",
      img_url: "gs://shopping-list-wits.appspot.com/sweet/sweet-aero.png",
      price: "25",
    })

    
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(25),
    })

    let toast = Toast.show('Aero'+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  
  
  };
  
  const addJellyTotsToCart=async()=>{
    //add item to cart
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Jelly Tots",
      img_url: "gs://shopping-list-wits.appspot.com/sweet/sweet-jelly-tots.png",
      price: "12",
    })

    
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(12),
    })

    let toast = Toast.show('Jelly Tots'+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  
  
  };
  
  const addSoapToCart=async()=>{
    //add item to cart
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Hand Soap",
      img_url: "gs://shopping-list-wits.appspot.com/toilet/toilet-hand-soap.jpeg",
      price: "150",
    })

    
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(150),
    })

    let toast = Toast.show('Hand Soap'+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  
  
  };
  
  const addShampooToCart=async()=>{
    //add item to cart
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Shampoo",
      img_url: "gs://shopping-list-wits.appspot.com/toilet/toilet-shampoo.jpeg",
      price: "80",
    })

    
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(80),
    })

    let toast = Toast.show('Shampoo'+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  
  
  };
  
  const addOnionToCart=async()=>{
    //add item to cart
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Onion",
      img_url: "gs://shopping-list-wits.appspot.com/veg/veg-onion.jpeg",
      price: "40",
    })

    
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(40),
    })

    let toast = Toast.show('Onion'+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  
  
  };
  
  const addPotatoToCart=async()=>{
    //add item to cart
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Potatoes",
      img_url: "gs://shopping-list-wits.appspot.com/veg/veg-potato.jpeg",
      price: "35",
    })

    
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(35),
    })

    let toast = Toast.show('Potatoes'+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  
  
  };

   
  

 



  return (

  
      
      
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style = {styles.title}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator = {false} style = {styles.scrollViewCategories}>
            {/*Created custom category items component. It has an image,text and onpress component*/}
            <CategoryItems
              icon={Dairy}
              text="Dairy"
              onPress={() => navigation.navigate("Dairy")}
              
            
            /> 
            <CategoryItems
              icon={Chocolate}
              text = "Sweets"
              onPress={() => navigation.navigate("Sweets")}

            
            /> 
            <CategoryItems
              icon={Meat}
              text = "Meat"
              onPress={() => navigation.navigate("Meat")}
            
            /> 
            <CategoryItems
              icon={Drinks}
              text = "Drinks"
              onPress={() => navigation.navigate("Drinks")}
            
            /> 
            <CategoryItems
              icon={ReadyMade}
              text = "Ready Made"
              onPress={() => navigation.navigate("ReadyMade")}
            
            /> 
            <CategoryItems
              icon={Toiletries}
              text = "Toiletries"
              onPress={() => navigation.navigate("Toiletries")}
            
            /> 
            <CategoryItems
              icon={Veggies}
              text = "Vegetables"
              onPress={() => navigation.navigate("Vegetables")}
            
            /> 

          </ScrollView>
       
        </View>
        
        <View style={styles.topProducts}>
        <Text style={styles.title}>Top Products</Text>
        <ScrollView vertical showsVerticalScrollIndicator = {false} >
            <ItemsBox
              icon={Milk}
              text={"Low Fat Milk"+" - "+"R20"}
              onPress={addMilkToCart}
            /> 
            <ItemsBox
              icon={Coke}
              text={"Coke"+" - "+"R12"}
              onPress={addCokeToCart}
            /> 
            <ItemsBox
              icon={Pie}
              text={"Chicken Pie"+" - "+"R45"}
              onPress={addPieToCart}
            /> 
            <ItemsBox
              icon={Pizza}
              text={"Frozen Pizza"+" - "+"R70"}
              onPress={addPizzaToCart}
            /> 
            <ItemsBox
              icon={Aero}
              text={"Aero"+" - "+"R25"}
              onPress={addAeroToCart}
            /> 
            <ItemsBox
              icon={Jelly}
              text={"Jelly Tots"+" - "+"R12"}
              onPress={addJellyTotsToCart}
            /> 
            <ItemsBox
              icon={Soap}
              text={"Hand Soap"+" - "+"R150"}
              onPress={addSoapToCart}
            /> 
            <ItemsBox
              icon={Shampoo}
              text={"Shampoo"+" - "+"R80"}
              onPress={addShampooToCart}
            /> 
            <ItemsBox
              icon={Onion}
              text={"Onion"+" - "+"R40"}
              onPress={addOnionToCart}
            /> 
            <ItemsBox
              icon={Potato}
              text={"Potatoes"+" - "+"R35"}
              onPress={addPotatoToCart}
            /> 
           </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
    
   
  )
}

export default HomeScreen


//styling for the elements on the page
const styles = StyleSheet.create({

  title:{
    fontSize: 18,
    fontWeight: '700',
    color: "#2A2C41",
    marginTop: 20,
  },
  scrollViewCategories: {
    paddingLeft: 20,
    marginTop: 20,
  },
  topProducts: {
    
    
    justifyContent: 'center',
   
    
  }
 


})