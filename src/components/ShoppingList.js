import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { UserAuth } from '../contexts/AuthContext';
import {db, storage} from "../firebase";
import {addDoc, collection, getDocs} from 'firebase/firestore';
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
import { NavItem } from 'react-bootstrap';

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

  //need to display all the cart items immedailty when the page is loaded without having to click on a button
  //useEffect hook -> function to be called that allows info to be loaded as soon as the page is loaded
  //make api call to firebase inside the useEffect hook
  useEffect(()=>{
    //use an async function
    //api calls in JS will return a promise
    //never know how long will take for data to return back -> async
    //cant makr useEffect async and therefore need to make an async function inside that will be called
    const getCartItems=async()=>{
      //var to ref data we gonna get back
      //await is used to handle promise
      //getDocs-firebase func->returns all documents from a collection
      const data=await getDocs(cartCollectionRef);

      //setCartItems state to be the array from collection
      //map from each doc   and set equal to obejct in cartItems array
      //...doc.data will return the fields of the item
      //then also add the id
     setCartItems(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    };
    //call async function
    getCartItems();
  },[]);

  return(
    <>
      <div className='text-white border border-mainBlue bg-mainBlue py-1  mb-2'>
         <div >
           <div>
             <h1 className='text-4xl font-bold py-2 text-4xl font-bold py-2 text-center'>Your Cart</h1>
           </div>
         </div>
      </div>
      <Container>
        <ImageList sx={{mb:8, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',}}>
          {cartItems.map(item=>{
            return(
                <Card variant="outlined" sx={{display: 'flex' }}>
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
                      <IconButton aria-label="previous">
                        {theme.direction==="rtl" ? <DeleteIcon/> : <CheckBoxIcon/>}
                      </IconButton> 
                      <IconButton aria-label="previous">
                        {theme.direction==="rtl" ? <CheckBoxIcon/> : <DeleteIcon/>}
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


//   return (
//     <>
//     <div className='text-white border border-mainBlue bg-mainBlue py-1  mb-2'>
//         <div >
//           <div>
//             <h1 className='text-4xl font-bold py-2 text-4xl font-bold py-2 text-center'>Your Cart</h1>
//           </div>
//         </div>
//      </div>

//      <Container>
//           <ImageList gap={12}
//           sx={{mb:8,
//                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))!important',}}>
//             {cartItems.map(item=>{
//               return(
//                   <Card key={item.id}>
//                   <ImageListItem sx={{height: '100% !important'}}>
//                       <img src={ctc} style={{cursor:'pointer'}} loading="lazy"></img>
//                       <ImageListItemBar
//                         title={item.data}
//                         actionIcon={
//                         <Tooltip title={"add item to cart"} sx={{mr:'5px'}} style={{cursor:'pointer'}}>
//                           <AddCircleIcon/>
//                         </Tooltip>
//                       }
//                       />
//                   </ImageListItem>
//                 </Card>
//               )
//             })}
//           </ImageList>
//         </Container>
//         <NavBar/>
//     </>
//   )

export default ShoppingList