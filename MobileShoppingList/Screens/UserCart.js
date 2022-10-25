import React, {useState, useEffect} from 'react'
import {Text,StyleSheet,SafeAreaView,ScrollView,View,} from 'react-native'
import {addDoc, collection, getDocs, doc, deleteDoc, onSnapshot,  query, updateDoc, increment} from 'firebase/firestore';
import {ref, getDownloadURL} from 'firebase/storage';
import {auth, db, storage} from '../firebase';
import ctc from '../images/Logo.png';
import ItemsBox from '../itemBoxes/cartProducts';
import { useNavigation } from '@react-navigation/core'
import Toast from 'react-native-root-toast';

const UserCart = () => {
  
    const [cartItems, setCartItems]=useState([]);
    const[url, setUrl]=useState([]);
    const[cartCost, setCartCost]=useState(0);

    const userId="car_of_"+ auth.currentUser.email;
    //ref to cart collection for this user
    const cartCollectionRef=collection(db, "user_cart", userId , "cart");

    


  
  async function removeItemFromCart(arr){
   
    const docName=arr[0];
    const price=arr[1];
    

    //delete the doc 
    await deleteDoc(doc(db, "user_cart",userId, "cart", docName));
    //decrease the cost of the cart
    await updateDoc(doc(db, "user_cart", userId),{
     cart_cost: increment(-price),
    })

    if(cartCost!=0)
    {
      setCartCost(cartCost-price);  
    } 

    let toast = Toast.show('removed from cart', {
      duration: Toast.durations.LONG,
    });
    
   
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1500);


}



  useEffect(()=>{
    const getItems=()=>{
      //path to db
      const q=query(cartCollectionRef);
      //snapshot is a snpa of curr image in database 
      const unsubscribe=onSnapshot(q, (querySnapshot)=>{
          let items=[];
          querySnapshot.forEach((doc)=>{
            items.push({...doc.data(), id: doc.id});
        });
        setCartItems(items);
      });
      return ()=>{
        unsubscribe();
      }
    }
    userId && getItems();
  },[userId]);


    //use effect handling thr retrivel of imags from the database
    useEffect(()=>{
      //create an async functiopn so we can use the await key word
      const getImgUrl=async()=>{
        //image array wil store an object made from the items name and a url to the image
        const imageArray=[];
        for(let i=0; i<cartItems.length; ++i)
        {
            //get url for the image of the relevant itme
            const imgUrl=await getDownloadURL(ref(storage,cartItems[i].img_url));
            //create objecr
            imageArray.push({name: `${cartItems[i].data}`, url: `${imgUrl}`});
        }
        //set the url state to the image array
        setUrl(imageArray);
      }
     cartItems && getImgUrl();

    },[cartItems]);

    useEffect(()=>{
      setCartCost(0);
      const unsub=onSnapshot(doc(db, "user_cart", userId), (doc)=>{
        setCartCost(doc.data().cart_cost);
      })
    },[cartItems]);

  
  
  
    
  
  
    return (

      
    <SafeAreaView style = {styles.flex}>
    <ScrollView>
      <View>
        <Text style = {styles.title}>Your Cart</Text>
        <Text style = {styles.title}>Cart Total: R{cartCost}</Text> 
       
              
              {cartItems && cartItems.map(item=>{
                //stores image url to be used
                let img;
                //need in if statemnt to handle useffect has not run yet
                if(url.length!=0)
                {
                  //if our url has been populated then use the image
                  let img_url=url.find(img=>img.name===item.data);
                  img=img_url.url;
                }
                else
                {
                  //if it has not then use our logo and on the next render it will change
                  img=ctc;
                }
                    return(
                     
                     <ScrollView vertical showsVerticalScrollIndicator = {false} key = {item.id}>
                       <ItemsBox
                          icon={url.length == 0 ? img :{uri: img}}
                          text={item.data + " - " +"R"+ item.price}
                          onPress={() =>removeItemFromCart([item.id, item.price])}
                          
                        
                        /> 
                     
                    
                    
                    
                    
  
                      </ScrollView>

                    )
                  

                  })}

        
      </View>
    </ScrollView>
  </SafeAreaView>






  )






}

export default UserCart

const styles = StyleSheet.create({

  image:{
  
     width:260,
     height:300,
     resizeMode: 'contain',
     margin:8,
   
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