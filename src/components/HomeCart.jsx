import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import {db, storage} from "../firebase";
import {addDoc, collection, getDocs, doc, deleteDoc, onSnapshot,  query, updateDoc, increment} from 'firebase/firestore';
import ctc from "../images/CTCC.jpg"
import { getDownloadURL,ref } from 'firebase/storage';
import NavBar from './NavBar'
import {Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Tooltip} from "@mui/material";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';

const HomeCart = () => {

    //assign naviagte to the use navigate function
    const navigate=useNavigate();

    //need hook to hold list of items in cart
    //use useState hook->set to empty array by default
    const [homeItems, setHomeItems]=useState([]);
    const[url, setUrl]=useState([]);

    //get curr users email from the aith context
    const {user}=UserAuth();
    //name of cart for this user
    const userId="car_of_"+user.email;
    //ref to cart collection for this user
    const homeCollectionRef=collection(db, "user_cart", userId , "home_items");

    const backToCats=()=>{
      navigate("/categories")
    }

    const removeItemFromCart=async(event)=>{
      event.preventDefault();
  
      const docName=event.currentTarget.id;
  
      //delete the doc 
      await deleteDoc(doc(db, "user_cart",userId, "home_items", docName));
  }

    //gets all the items from the datatbase 
    useEffect(()=>{
        //get items that have been added to home cart
        const getItems=()=>{
          //path to db
          const q=query(homeCollectionRef);
          //snapshot is a snpa of curr image in database 
          const unsubscribe=onSnapshot(q, (querySnapshot)=>{
              let items=[];
              querySnapshot.forEach((doc)=>{
                items.push({...doc.data(), id: doc.id});
            });
            setHomeItems(items);
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
        for(let i=0; i<homeItems.length; ++i)
        {
            //get url for the image of the relevant itme
            const imgUrl=await getDownloadURL(ref(storage,homeItems[i].img_url));
            //create objecr
            imageArray.push({name: `${homeItems[i].data}`, url: `${imgUrl}`});
        }
        //set the url state to the image array
        setUrl(imageArray);
      }
     homeItems && getImgUrl();

    },[homeItems]);

    return(
      <>
        <div className='text-white border border-mainBlue bg-mainBlue py-1  mb-2'>
           <div >
             <div>
               <h1 className='text-4xl font-bold py-2 text-4xl font-bold py-2 text-center'>Home Cart</h1>
             </div>
           </div>
        </div>
        <Container>
          <ImageList sx={{mb:8, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',}}>
            {homeItems && homeItems.map(item=>{
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
                  <Card key={item.id} variant="outlined" sx={{display: 'flex' }}>
                    <CardMedia
                      component="img"
                      sx={{width:151}}
                      image={img}
                      />
                    <Box sx={{display: 'flex', flexDirection:'column'}}>
                      <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h5">
                          {item.data}
                        </Typography>
                        <Typography component="div" variant="h6">
                          {"Exp Date: "}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">
                          <DeleteIcon onClick={removeItemFromCart} id={item.id}/>
                        </IconButton>               
                      </Box>
                    </Box>
                </Card>
              )
            })}
          </ImageList> 
        </Container> 
        <Card variant="outlined" sx={{display: 'flex' }}>
          <Box sx={{display: 'flex', flexDirection:'column'}}>
            <CardContent sx={{flex: '1 0 auto'}}>
              <Button variant="contained" size="large" display="flex" onClick={backToCats}>Continue Shopping</Button>
            </CardContent>
          </Box>
        </Card>
        <NavBar/>
      </>
    )
}

export default HomeCart