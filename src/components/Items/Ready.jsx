import React from 'react';
import {Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Tooltip, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { useEffect } from 'react';
import {db, storage} from "../../firebase";
import {addDoc, collection, getDocs, increment, updateDoc,doc} from 'firebase/firestore';
import {ref, getDownloadURL} from 'firebase/storage';
import ctc from "../../images/CTCC.jpg"
import NavBar from '../NavBar';
import * as Bi from "react-icons/bi";
import { Link, NavLink } from 'react-router-dom';
import { UserAuth } from '../../contexts/AuthContext';
import Counter from "react-mui-counter";

const Ready = () => {

  //need state to hold list of ready items
  //use useState hook->set to empty array by default
  //ready Items is a list that will hold all the ready items from the DB
  //function setreadyItems is used to alter the readyItems list
  const [readyItems, setReadyItems]=useState([]);
  //variable holding the refernce to the DB collection
  //pass in db variable from fireabse file, collection name in DB
  //collection is a firebase function
  const readyItemsCollectionRef=collection(db, "ready_items");
  //state for image, defualt is null
  const [url, setUrl]=useState([]);

  const {user}=UserAuth();

  //need to display all the ready items immedailty when the page is loaded without having to click on a button
  //useEffect hook -> function to be called that allows info to be loaded as soon as the page is loaded
  //make api call to firebase inside the useEffect hook
  useEffect(()=>{

    //use an async function
    //api calls in JS will return a promise
    //never know how long will take for data to return back -> async
    //cant makr useEffect async and therefore need to make an async function inside that will be called
    const getReadyItems=async()=>{

      //var to ref data we gonna get back
      //await is used to handle promise
      //getDocs-firebase func->returns all documents from a collection
      const data=await getDocs(readyItemsCollectionRef);

      //setreadyItems state to be the array from collection
      //map from each doc   and set equal to obejct in readyItems array
      //...doc.data will return the fields of the item
      //then also add the id
      setReadyItems(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));

    };

    //call async function
    getReadyItems();
  },[]);

  //use effect handling thr retrivel of imags from the database
  useEffect(()=>{
    //create an async functiopn so we can use the await key word
    const getImgUrl=async()=>{
      //image array wil store an object made from the items name and a url to the image
      const imageArray=[];
      for(let i=0; i<readyItems.length; ++i)
      {
          //get url for the image of the relevant itme
          const imgUrl=await getDownloadURL(ref(storage,readyItems[i].img_url));
          //create objecr
          imageArray.push({name: `${readyItems[i].name}`, url: `${imgUrl}`});
      }
      //set the url state to the image array
      setUrl(imageArray);
    }
    readyItems && getImgUrl();

  },[readyItems]);


  //function when plus icon cliked which addds item to customers cart
  const getNameItemToCart=async(event)=>
  {
    //split string so we have the item name and url sepeatly
    const eventString=event.currentTarget.id;
    const infoArray=eventString.split(",");
    console.log(infoArray[3]);
    const prodName=event.currentTarget.id;
    //get ref to curr customers cart collection
    const userId="car_of_"+user.email;
    const cartCollectionRef=collection(db, "user_cart", userId , "cart");
    await addDoc(cartCollectionRef, {
      data: infoArray[0],
      img_url: infoArray[1],
      price: infoArray[2],
      exp_time: infoArray[3],
    });

    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(infoArray[2]),
    })
  };


  const addSaladToCart=async()=>{

    const imgUrl=await getDownloadURL(ref(storage,"gs://shopping-list-wits.appspot.com/ready/ready-salad.jpeg"));
    console.log(imgUrl);

    //add item to cart
    const userId="car_of_"+user.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Salad", 
      img_url: "gs://shopping-list-wits.appspot.com/ready/ready-salad.jpeg",
      price: "70",
    });

    //increment cost
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(70),
    })

  }

  return (
    <>
      <div className='text-white border border-mainBlue bg-mainBlue py-1  mb-2'>
        <div >
          <div>
            <nav>
              <NavLink data-testid="back" key='back' to='/categories'>
                <Bi.BiArrowBack size={30}/>
              </NavLink>
            </nav>
          </div>
          <div>
            <h1 className='text-4xl font-bold py-2 text-4xl font-bold py-2 text-center'>Ready Made Products</h1>
          </div>
        </div>
      </div>
      <Container>
          <ImageList
          gap={12}
          sx={{
              mb:8,
              /*makes grid respond to different screen sizes */
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',
          }}>
              {readyItems.map(item=>{
                //stores image url to be used
                let img;
                //need in if statemnt to handle useffect has not run yet
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
                  <Card key={item.id}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={img} style={{cursor:'pointer'}}></img>
                        <ImageListItemBar sx={{borderRadius:1}}
                           title={item.name + " - " +"R"+ item.price}
                          actionIcon={
                          <Tooltip title={"add item to cart"} sx={{mr:'5px'}} style={{cursor:'pointer'}}>
                             <AddCircleIcon id={[item.name, item.img_url, item.price, item.exp_time]} onClick={getNameItemToCart}/>
                          </Tooltip>
                        }
                        />
                    </ImageListItem>
                  </Card>
                  /*
                  <Card key={item.id} sx={{border:0.1, borderColor:'rgba(0,0,0,0.3)', borderRadius:2,}}>
                  <ImageListItem sx={{height: '100% !important'}}>
                      <img src={img} style={{cursor:'pointer'}} loading="lazy"></img>
                      <ImageListItemBar 
                         sx={{
                           background:'rgba(255,255,255,0.75)', 
                           color:"text.secondary",
                         }}
                        title={<Typography variant ="h6" color="black">{item.name + " - " +"R"+ item.price}</Typography>}
                        actionIcon={
                         <Counter sx={{
                           border:0.7,
                           borderRadius:2,
                           width: 150,
                         }}/>
                      }
                      />
                  </ImageListItem>
                </Card>
                */
                )
              })}
            {/* <Card>
              <ImageListItem sx={{height: '100% !important'}}>
                  <img src={"https://firebasestorage.googleapis.com/v0/b/shopping-list-wits.appspot.com/o/ready%2Fready-salad.jpeg?alt=media&token=8aabdb41-8531-4f6c-8221-29bee828d2d2"} style={{cursor:'pointer'}} loading="lazy"></img>
                  <ImageListItemBar
                    title={"Salad"+" - "+"R70"}
                    actionIcon={
                    <Tooltip title={"add item to cart"} sx={{mr:'5px'}} style={{cursor:'pointer'}}>
                      <AddCircleIcon  onClick={addSaladToCart}/>
                    </Tooltip>
                  }
                  />
              </ImageListItem>
            </Card>  */}


          </ImageList>
      </Container>
      <NavBar/>
    </>
  )
}

export default Ready