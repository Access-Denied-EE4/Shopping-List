import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { UserAuth } from '../contexts/AuthContext';
import {db, storage} from "../firebase";
import {addDoc, collection, getDocs, doc, deleteDoc, onSnapshot,  query} from 'firebase/firestore';
import {Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ctc from "../images/CTCC.jpg"
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const ShoppingList = () => {
  const theme = useTheme();  

  //need hook to hold list of items in cart
  //use useState hook->set to empty array by default
  const [cartItems, setCartItems]=useState([]);

  //get curr users email from the aith context
  const {user}=UserAuth();
  //name of cart for this user
  const userId="car_of_"+user.email;
  //ref to cart collection for this user
  const cartCollectionRef=collection(db, "user_cart", userId , "cart");

  const removeItemFromCart=async(event)=>{
    const docName=event.currentTarget.id;
    await deleteDoc(doc(db, "user_cart",userId, "cart", docName));
}

  useEffect(()=>{
    const q=query(cartCollectionRef);
    const unsubscribe=onSnapshot(q, (querySnapshot)=>{
      let items=[];
      querySnapshot.forEach((doc)=>{
        items.push({...doc.data(), id: doc.id});
      });
      setCartItems(items);
    });
    return ()=> unsubscribe();
  },[]);

  return(
    <>
      {console.log(cartItems)}
      <div className='text-white border border-mainBlue bg-mainBlue py-1  mb-2'>
         <div >
           <div>
             <h1 className='text-4xl font-bold py-2 text-4xl font-bold py-2 text-center'>Your Cart</h1>
           </div>
         </div>
      </div>
      <Container>
        <ImageList sx={{mb:8, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',}}>
          {cartItems && cartItems.map(item=>{
            return(
                <Card key={item.id} variant="outlined" sx={{display: 'flex' }}>
                  <CardMedia
                    component="img"
                    sx={{width:151}}
                    image={ctc}
                    />
                  <Box sx={{display: 'flex', flexDirection:'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                      <Typography component="div" variant="h5">
                        {item.data}
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                      <IconButton aria-label="previous" onClick={removeItemFromCart} id={item.id}>
                        <DeleteIcon/>
                      </IconButton> 
                      <IconButton aria-label="previous">
                        <CheckBoxIcon/>
                      </IconButton>               
                    </Box>
                  </Box>
              </Card>
            )
          })}
        </ImageList> 
      </Container> 
      <NavBar/>
    </>
  )
 }

export default ShoppingList