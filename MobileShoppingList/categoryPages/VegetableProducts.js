import React, {useState, useEffect} from 'react'
import { SafeAreaView, Text,StyleSheet,ScrollView,View, Image } from 'react-native'
import {collection, getDocs} from 'firebase/firestore';
import {ref, getDownloadURL} from 'firebase/storage';
import {db, storage} from '../firebase';
import ctc from '../images/Logo.png';


const DairyProducts = () => {

  const [vegetableItems, setVegetableItems]=useState([]);
  //variable holding the refernce to the DB collection
  //pass in db variable from fireabse file, collection name in DB
  //collection is a firebase function
  const vegetableItemsCollectionRef=collection(db, "veg_items");


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
    const getvegetableItems=async()=>{
      //var to ref data we gonna get back
      //await is used to handle promise
      //getDocs-firebase func->returns all documents from a collection
      const data=await getDocs(vegetableItemsCollectionRef);

      //setVegetableItems state to be the array from collection
      //map from each doc   and set equal to obejct in vegetableItems array
      //...doc.data will return the fields of the item
      //then also add the id
     setVegetableItems(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    };
    //call async function
    getvegetableItems();
  },[]);

  //use effect handling thr retrivel of imags from the database
  useEffect(()=>{
    //create an async functiopn so we can use the await key word
    const getImgUrl=async()=>{
      //image array wil store an object made from the items name and a url to the image
      const imageArray=[];
      for(let i=0; i<vegetableItems.length; ++i)
      {
          //get url for the image of the relevant itme
          const imgUrl=await getDownloadURL(ref(storage,vegetableItems[i].img_url));
          //create objecr
          imageArray.push({name: `${vegetableItems[i].name}`, url: `${imgUrl}`});
      }
      //set the url state to the image array
      setUrl(imageArray);
    }
    getImgUrl();

  },[vegetableItems]);
 
  
    
  
 
  
  
  
  return (
    
    <SafeAreaView style = {styles.flex}>
      <ScrollView>
        <View>
          <Text style = {styles.title}>Vegetable Products</Text>
                  {
                    vegetableItems.map(item => {
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
                       
                       <ScrollView vertical showsVerticalScrollIndicator = {false} key = {item.id}>
                       
                      
                          <Text style = {styles.title}>{item.name}</Text>
                          <Image style ={styles.image} source={url.length == 0 ? img :{uri: img}}/>
                      
                       
    
                        </ScrollView>

                      )
                    

                    })}

          
        </View>
      </ScrollView>
    </SafeAreaView>










  )
}

export default DairyProducts

const styles = StyleSheet.create({

 image:{
 
    width:260,
    height:300,
    resizeMode: 'cover',
    margin:8
  
 },
 


  title:{
    fontSize: 18,
    fontFamily: 'Helvetica',
    fontWeight: '700',
    color: "0818F5",
    marginTop: 20,
  },
  flex:{
    flex: 1,


  },
  scrollViewCategories: {
    paddingLeft: 20,
    marginTop: 20,
  },
 
  
 

 

})