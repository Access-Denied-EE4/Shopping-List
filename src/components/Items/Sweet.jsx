import React from 'react';
import {Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Tooltip} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { useEffect } from 'react';
import {db} from "../../firebase";
import {collection, getDocs} from 'firebase/firestore';
import ctc from "../../images/CTCC.jpg"

const Sweet = () => {

  //need state to hold list of sweet items 
  //use useState hook->set to empty array by default 
  //sweet Items is a list that will hold all the sweet items from the DB
  //function setsweetItems is used to alter the sweetItems list
  const [sweetItems, setSweetItems]=useState([]);
  //variable holding the refernce to the DB collection
  //pass in db variable from fireabse file, collection name in DB
  //collection is a firebase function 
  const sweetItemsCollectionRef=collection(db, "sweet_items");

  //need to display all the sweet items immedailty when the page is loaded without having to click on a button
  //useEffect hook -> function to be called that allows info to be loaded as soon as the page is loaded
  //make api call to firebase inside the useEffect hook
  useEffect(()=>{

    //use an async function 
    //api calls in JS will return a promise
    //never know how long will take for data to return back -> async
    //cant makr useEffect async and therefore need to make an async function inside that will be called
    const getSweetItems=async()=>{

      //var to ref data we gonna get back
      //await is used to handle promise
      //getDocs-firebase func->returns all documents from a collection 
      const data=await getDocs(sweetItemsCollectionRef);
      
      //setsweetItems state to be the array from collection
      //map from each doc   and set equal to obejct in sweetItems array
      //...doc.data will return the fields of the item
      //then also add the id 
      setSweetItems(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));

    };

    //call async function 
    getSweetItems();
  },[]);

  return (
    <>
      <Container>
          <ImageList
          gap={12}
          sx={{
              mb:8,
              /*makes grid respond to different screen sizes */
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',
          }}>
              {sweetItems.map(item=>{
                return(
                  <Card key={item.id}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={ctc} style={{cursor:'pointer'}}></img>
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
    </>
  )
}

export default Sweet