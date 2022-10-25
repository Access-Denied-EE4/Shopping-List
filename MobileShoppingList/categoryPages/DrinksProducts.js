import React, {useState, useEffect} from 'react'
import { SafeAreaView, Text,StyleSheet,ScrollView,View, Image } from 'react-native'
import {collection, getDocs,addDoc,doc,increment, updateDoc} from 'firebase/firestore';
import {ref, getDownloadURL} from 'firebase/storage';
import {auth, db, storage} from '../firebase';
import ctc from '../images/Logo.png';
import ItemsBox from '../itemBoxes/prodBox';
import shoppingCart from '../images/shopping-cart.png';
import IconBox from '../shoppingCart/cartBox';
import { useNavigation } from '@react-navigation/core'
import Toast from 'react-native-root-toast';

const DrinkProducts = () => {

  const [drinkItems, setDrinkItems]=useState([]);
  //variable holding the refernce to the DB collection
  //pass in db variable from fireabse file, collection name in DB
  //collection is a firebase function
  const drinkItemsCollectionRef=collection(db, "drink_items");

  const navigation = useNavigation();

  //state for image, defualt is null
   const [url, setUrl]=useState([]);


  //need to display all the dairy items immedailty when the page is loaded without having to click on a button
  //useEffect hook -> function to be called that allows info to be loaded as soon as the page is loaded
  //make api call to firebase inside the useEffect hook
  useEffect(()=>{
    //use an async function
    //api calls in JS will return a promise
    //never know how long will take for data to return back -> async
    //cant makr useEffect async and therefore need to make an async function inside that will be called
    const getdrinkItems=async()=>{
      //var to ref data we gonna get back
      //await is used to handle promise
      //getDocs-firebase func->returns all documents from a collection
      const data=await getDocs(drinkItemsCollectionRef);

      //setDrinkItems state to be the array from collection
      //map from each doc   and set equal to obejct in drinkItems array
      //...doc.data will return the fields of the item
      //then also add the id
     setDrinkItems(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    };
    //call async function
    getdrinkItems();
  },[]);

  //use effect handling thr retrivel of imags from the database
  useEffect(()=>{
    //create an async functiopn so we can use the await key word
    const getImgUrl=async()=>{
      //image array wil store an object made from the items name and a url to the image
      const imageArray=[];
      for(let i=0; i<drinkItems.length; ++i)
      {
          //get url for the image of the relevant itme
          const imgUrl=await getDownloadURL(ref(storage,drinkItems[i].img_url));
          //create objecr
          imageArray.push({name: `${drinkItems[i].name}`, url: `${imgUrl}`});
      }
      //set the url state to the image array
      setUrl(imageArray);
    }
    getImgUrl();

  },[drinkItems]);

  
  async function getNameItemToCart(arr){
    //split string so we have the item name and url sepeatly
     
    //get ref to curr customers cart collection
    const userId="car_of_"+auth.currentUser.email;
    const cartCollectionRef=collection(db, "user_cart", userId , "cart");
    await addDoc(cartCollectionRef, {
      data: arr[0],
      img_url: arr[1],
      price: arr[2],
    });

    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(arr[2]),
    })

    let toast = Toast.show(arr[0]+' '+'added to cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);
  };
 
  
 
  
    
  
 
  
  
  
  return (
    
    <SafeAreaView style = {styles.flex}>
      <ScrollView>
        <View>
        <IconBox 
            icon={shoppingCart}
            onPress={() => navigation.navigate("Cart")}
          
          />
          <Text style = {styles.title}>Drink Products</Text>
                  {
                    drinkItems.map(item => {
                      let img;
                      if(url.length!=0)
                      {
                        //if our url has been populated then use the image
                        let img_url=url.find(img=>img.name===item.name);
                        img=img_url.url;
                      }
                      else
                      {
                        //if it has not then use our logo and on the next render it will change
                        img=ctc;
                      }
                      return(
                       
                       <ScrollView vertical showsVerticalScrollIndicator = {false}  key = {item.id}>
                        <ItemsBox
                            icon={url.length == 0 ? img :{uri: img}}
                            text={item.name + " - " +"R"+ item.price}
                            onPress={() => getNameItemToCart([item.name, item.img_url, item.price])}

                           
                            
                            
                          
                          /> 
                        </ScrollView>

                      )
                    

                    })}

          
        </View>
      </ScrollView>
    </SafeAreaView>










  )
}

export default DrinkProducts

const styles = StyleSheet.create({

  title:{
    fontSize: 18,
    fontFamily: 'Helvetica',
    fontWeight: '700',
    color: "0818F5",
    
  },
  flex:{
    flex: 1,
    justifyContent: 'center',
    


  },
  scrollViewCategories: {
    paddingLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    
    
  
  },
 
  
 

 

})