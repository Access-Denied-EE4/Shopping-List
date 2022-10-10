import React from 'react';
import {Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Tooltip} from "@mui/material";
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

const Veg = () => {

  //need state to hold list of veg items
  //use useState hook->set to empty array by default
  //veg Items is a list that will hold all the veg items from the DB
  //function setvegItems is used to alter the vegItems list
  const [vegItems, setVegItems]=useState([]);
  //variable holding the refernce to the DB collection
  //pass in db variable from fireabse file, collection name in DB
  //collection is a firebase function
  const vegItemsCollectionRef=collection(db, "veg_items");

  //state for image, defualt is null
  const [url, setUrl]=useState([]);

  const {user}=UserAuth();

  //need to display all the veg items immedailty when the page is loaded without having to click on a button
  //useEffect hook -> function to be called that allows info to be loaded as soon as the page is loaded
  //make api call to firebase inside the useEffect hook
  useEffect(()=>{

    //use an async function
    //api calls in JS will return a promise
    //never know how long will take for data to return back -> async
    //cant makr useEffect async and therefore need to make an async function inside that will be called
    const getVegItems=async()=>{

      //var to ref data we gonna get back
      //await is used to handle promise
      //getDocs-firebase func->returns all documents from a collection
      const data=await getDocs(vegItemsCollectionRef);

      //setvegItems state to be the array from collection
      //map from each doc   and set equal to obejct in vegItems array
      //...doc.data will return the fields of the item
      //then also add the id
      setVegItems(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));

    };

    //call async function
    getVegItems();
  },[]);

  //use effect handling thr retrivel of imags from the database
  useEffect(()=>{
    //create an async functiopn so we can use the await key word
    const getImgUrl=async()=>{
      //image array wil store an object made from the items name and a url to the image
      const imageArray=[];
      for(let i=0; i<vegItems.length; ++i)
      {
          //get url for the image of the relevant itme
          const imgUrl=await getDownloadURL(ref(storage,vegItems[i].img_url));
          //create objecr
          imageArray.push({name: `${vegItems[i].name}`, url: `${imgUrl}`});
      }
      //set the url state to the image array
       setUrl(imageArray);
    }
    vegItems && getImgUrl();

  },[vegItems]);

  //function when plus icon cliked which addds item to customers cart
  const getNameItemToCart=async(event)=>
  {
    //split string so we have the item name and url sepeatly
    const eventString=event.currentTarget.id;
    const infoArray=eventString.split(",");

    const prodName=event.currentTarget.id;
    //get ref to curr customers cart collection
    const userId="car_of_"+user.email;
    const cartCollectionRef=collection(db, "user_cart", userId , "cart");
    await addDoc(cartCollectionRef, {
      data: infoArray[0],
      img_url: infoArray[1],
      price: infoArray[2],
    });

    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(infoArray[2]),
    })
  };


  const addAppleToCart=async()=>{

    const imgUrl=await getDownloadURL(ref(storage,"gs://shopping-list-wits.appspot.com/veg/veg-apple.webp"));
    console.log(imgUrl);

    //add item to cart
    const userId="car_of_"+user.email;
    const cartCollectionRef=collection(db, "user_cart", userId, "cart");
    await addDoc(cartCollectionRef, {
      data: "Apple",
      img_url: "gs://shopping-list-wits.appspot.com/veg/veg-apple.webp",
      price: "15",
    });

    //increment cost
    const cartPriceRef=doc(db, "user_cart", userId);
    await updateDoc(cartPriceRef,{
      cart_cost: increment(15),
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
            <h1 className='text-4xl font-bold py-2 text-4xl font-bold py-2 text-center'>Fruit and Vegetabels</h1>
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
              {vegItems.map(item=>{
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
                        <ImageListItemBar
                          title={item.name}
                          actionIcon={
                          <Tooltip title={"add item to cart"} sx={{mr:'5px'}} style={{cursor:'pointer'}}>
                             <AddCircleIcon id={[item.name, item.img_url, item.price]} onClick={getNameItemToCart}/>
                          </Tooltip>
                        }
                        />
                    </ImageListItem>
                  </Card>
                )
              })}

            <Card>
              <ImageListItem sx={{height: '100% !important'}}>
                  <img src={"https://firebasestorage.googleapis.com/v0/b/shopping-list-wits.appspot.com/o/veg%2Fveg-apple.webp?alt=media&token=6d27d1e3-8184-4947-9839-7efaa3685bce"} style={{cursor:'pointer'}} loading="lazy"></img>
                  <ImageListItemBar
                    title={"Apple"+" - "+"R15"}
                    actionIcon={
                    <Tooltip title={"add item to cart"} sx={{mr:'5px'}} style={{cursor:'pointer'}}>
                      <AddCircleIcon  onClick={addAppleToCart}/>
                    </Tooltip>
                  }
                  />
              </ImageListItem>
            </Card>

          </ImageList>
          <AddCircleIcon data-testid='add veg to cart'  onClick={addAppleToCart}/>
      </Container>
      <NavBar/>
    </>
  )
}

export default Veg