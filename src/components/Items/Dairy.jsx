import React from 'react';
import {Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Tooltip} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { useEffect } from 'react';
import {db, storage} from "../../firebase";
import {collection, getDocs} from 'firebase/firestore';
import {ref, getDownloadURL} from 'firebase/storage';
import ctc from "../../images/CTCC.jpg"

const Dairy = () => {

  //need state to hold list of dairy items 
  //use useState hook->set to empty array by default 
  //dairy Items is a list that will hold all the dairy items from the DB
  //function setDairyItems is used to alter the dairyItems list
  const [dairyItems, setDairyItems]=useState([]);
  //variable holding the refernce to the DB collection
  //pass in db variable from fireabse file, collection name in DB
  //collection is a firebase function
  const dairyItemsCollectionRef=collection(db, "dairy_items");


  //state for image, defualt is null
  const [url, setUrl]=useState(null);


  //need to display all the dairy items immedailty when the page is loaded without having to click on a button
  //useEffect hook -> function to be called that allows info to be loaded as soon as the page is loaded
  //make api call to firebase inside the useEffect hook
  useEffect(()=>{
    //use an async function 
    //api calls in JS will return a promise
    //never know how long will take for data to return back -> async
    //cant makr useEffect async and therefore need to make an async function inside that will be called
    const getDairyItems=async()=>{

      //var to ref data we gonna get back
      //await is used to handle promise
      //getDocs-firebase func->returns all documents from a collection 
      const data=await getDocs(dairyItemsCollectionRef);
      
      //setDairyItems state to be the array from collection
      //map from each doc   and set equal to obejct in dairyItems array
      //...doc.data will return the fields of the item
      //then also add the id 
      setDairyItems(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));

      //store prod id of each item in image array
      const imageArray=[];
      for(let i=0; i<dairyItems.length; ++i)
      {
          const imgUrl=await getDownloadURL(ref(storage,dairyItems[i].img_url));
          imageArray[i]=imgUrl;
      }
      setUrl(imageArray);
    };
    //call async function 
    getDairyItems();
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
                <Card key={'meat'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={url[2]} style={{cursor:'pointer'}}></img>
                        <ImageListItemBar 
                        title={dairyItems[0].name}/>
                    </ImageListItem>
                </Card>
                <Card key={'dairy'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={url[0]} style={{cursor:'pointer'}}></img>
                        <ImageListItemBar 
                       title={dairyItems[1].name}/>
                    </ImageListItem>
                </Card>
                <Card key={'drink'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={url[1]} style={{cursor:'pointer'}} ></img>
                        <ImageListItemBar 
                        title={dairyItems[2].name}/>
                    </ImageListItem>
                </Card>
            </ImageList>
        </Container>
    </>
    // <>
    //   <Container>
    //       <ImageList
    //       gap={12}
    //       sx={{
    //           mb:8,
    //           /*makes grid respond to different screen sizes */
    //           gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',
    //       }}>
    //           {dairyItems.map(item=>{
    //             const imgRef=ref(storage, item.img_url);
    //             getDownloadURL(imgRef).then((url)=>{
    //               console.log(url);
    //               setUrl(url);
    //             });
    //             return(
    //               <Card key={item.id}>
    //                 <ImageListItem sx={{height: '100% !important'}}>
    //                     <img src={url} style={{cursor:'pointer'}}></img>
    //                     <ImageListItemBar 
    //                       title={item.name}
    //                       actionIcon={
    //                       <Tooltip title={"add item to cart"} sx={{mr:'5px'}} style={{cursor:'pointer'}}>
    //                         <AddCircleIcon/>
    //                       </Tooltip>
    //                     }
    //                     />
    //                 </ImageListItem>
    //               </Card>
    //             )
    //           })}
    //       </ImageList>
    //   </Container>
    // </>
  )
}

export default Dairy