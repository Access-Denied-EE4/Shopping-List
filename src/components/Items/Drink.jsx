import React from 'react';
import {Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Tooltip} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { useEffect } from 'react';
import {db, storage} from "../../firebase";
import {collection, getDocs} from 'firebase/firestore';
import {ref, getDownloadURL} from 'firebase/storage';
import ctc from "../../images/CTCC.jpg"
import NavBar from '../NavBar';
import * as Bi from "react-icons/bi";
import { Link, NavLink } from 'react-router-dom';


const Drink = () => {

  //need state to hold list of drink items 
  //use useState hook->set to empty array by default 
  //drink Items is a list that will hold all the drink items from the DB
  //function setdrinkItems is used to alter the drinkItems list
  const [drinkItems, setDrinkItems]=useState([]);
  //variable holding the refernce to the DB collection
  //pass in db variable from fireabse file, collection name in DB
  //collection is a firebase function 
  const drinkItemsCollectionRef=collection(db, "drink_items");

  //state for image, defualt is null
  const [url, setUrl]=useState([]);

  //need to display all the drink items immedailty when the page is loaded without having to click on a button
  //useEffect hook -> function to be called that allows info to be loaded as soon as the page is loaded
  //make api call to firebase inside the useEffect hook
  useEffect(()=>{

    //use an async function 
    //api calls in JS will return a promise
    //never know how long will take for data to return back -> async
    //cant makr useEffect async and therefore need to make an async function inside that will be called
    const getDrinkItems=async()=>{

      //var to ref data we gonna get back
      //await is used to handle promise
      //getDocs-firebase func->returns all documents from a collection 
      const data=await getDocs(drinkItemsCollectionRef);
      
      //setdrinkItems state to be the array from collection
      //map from each doc   and set equal to obejct in drinkItems array
      //...doc.data will return the fields of the item
      //then also add the id 
      setDrinkItems(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));

    };

    //call async function 
    getDrinkItems();
  },[drinkItems]);

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
  
    },[url]);

  return (
    <>
      <div className='text-white border border-mainBlue bg-mainBlue py-1  mb-2'>
        <div >
          <div>
            <nav>
              <NavLink key='back' to='/categories'>
                <Bi.BiArrowBack size={30}/>
              </NavLink>
            </nav>
          </div>
          <div>
            <h1 className='text-4xl font-bold py-2 text-4xl font-bold py-2 text-center'>Drinks</h1>
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
              {drinkItems.map(item=>{
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
                            <AddCircleIcon/>
                          </Tooltip>
                        }
                        />
                    </ImageListItem>
                  </Card>
                )
              })}
          </ImageList>
      </Container>
      <NavBar/>
    </>
  )
}

export default Drink