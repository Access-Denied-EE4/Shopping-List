import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { UserAuth } from '../contexts/AuthContext';
import {db, storage} from "../firebase";
import {addDoc, collection, getDocs, doc, deleteDoc, onSnapshot,  query, updateDoc, increment} from 'firebase/firestore';
import {Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ctc from "../images/CTCC.jpg"
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getDownloadURL,ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const ShoppingList = () => {

  //assign naviagte to the use navigate function
  const navigate=useNavigate();

  //need hook to hold list of items in cart
  //use useState hook->set to empty array by default
  const [cartItems, setCartItems]=useState([]);
  const[url, setUrl]=useState([]);
  const[cartCost, setCartCost]=useState(0);

  //get curr users email from the aith context
  const {user}=UserAuth();
  //name of cart for this user
  const userId="car_of_"+user.email;
  //ref to cart collection for this user
  const cartCollectionRef=collection(db, "user_cart", userId , "cart");

  const priceRef=doc(db, "user_cart", userId);

  const removeItemFromCart=async(event)=>{
    event.preventDefault();

    //get the info from the event and split up into variables
    const infoString=event.currentTarget.id;
    const infoStringArray=infoString.split(",");
    const docName=infoStringArray[0];
    const price=infoStringArray[1];

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
}

const addItemToHomeCart=async(event)=>{
    //split string so we have the item name and url sepeatly
    const eventString=event.currentTarget.id;
    const infoArray=eventString.split(",");

    //var to hold exp date
    let date;

    if(infoArray[3]==="N/A")
    {
      date="N/A";
    }
    else
    {
      //get ref to expirey time-> this indicates how long the product has before exp
      const expTimeArray=infoArray[3].split("-");
      let expTimeLen=parseInt(expTimeArray[0],10);
      console.log("TIME: "+expTimeLen);
  
      let expTimeType=expTimeArray[1];
      console.log("TYPE: "+ expTimeType);
      //get current date 
      const current=new Date();
      let day=current.getDate();
      let month=current.getMonth();
  
      /*if exp type is days*/
      if(expTimeType==="d" && day+expTimeLen<=31)
      {
        console.log("TIME < 31: " + (day +expTimeLen))
        //if curr date + exp time is less 31 then its in the same month and so just add days
        date = `${current.getDate()+expTimeLen}/${current.getMonth()+1}/${current.getFullYear()}`;
      }
      else if(expTimeType==="d" && day+expTimeLen>31)
      {
        console.log("TIME > 31: " + (day +expTimeLen))
        // curr date + exp time goes over into the next month and so need to add new month and get correct day
        const toEndMonth=31-day;
        const remainder=expTimeLen-toEndMonth;
        console.log("NEW TIME: "+remainder);
        date = `${remainder}/${current.getMonth()+1+1}/${current.getFullYear()}`;
  
      }
  
      /*if exp type is months*/
      if(expTimeType==="m" && expTimeLen+month<=12)
      {
        console.log("MONTH < 12: " + (month + expTimeLen))
        //if when adding mobth its <= 12 then still same year
        date = `${current.getDate()}/${current.getMonth()+1+expTimeLen}/${current.getFullYear()}`;
      }
      else if(expTimeType==="m" && expTimeLen+month >12)
      {
        console.log("CURR MONTH: "+ month);
        console.log("MONTH > 12: " + (month+expTimeLen))
  
        const toEndYear=12-month;
        const remainder=expTimeLen-toEndYear;
        console.log("NEW TIME: "+remainder);
        //have to go to next year and add months 
        date = `${current.getDate()}/${remainder+1}/${current.getFullYear()+1}`;
      }
      if(expTimeType==="y")
      {
        date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()+expTimeLen}`;
      }
      console.log("");
      console.log("");
 
    }
    //get ref to curr customers cart collection
    const userId="car_of_"+user.email;
    const homeCollectionRef=collection(db, "user_cart", userId , "home_items");
    await addDoc(homeCollectionRef, {
      data: infoArray[0],
      img_url: infoArray[1],
      price: infoArray[2],
      exp_time: date,
    });
}


const backToCats=()=>{
  navigate("/categories")
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
                        {"Num of Items: 30"}
                      </Typography>
                      <Typography component="div" variant="h6">
                        {"R" + item.price}
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                      <IconButton aria-label="previous" onClick={removeItemFromCart} id={[item.id, item.price]}>
                        <DeleteIcon/>
                      </IconButton> 
                      <IconButton aria-label="previous">
                        <CheckBoxIcon onClick={addItemToHomeCart} id={[item.data, item.img_url, item.price, item.exp_time]}/>
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
                      <Typography component="div" variant="h5">
                        Total cost
                      </Typography>
                      <Typography component="div" variant="h6">
                        {"R" + cartCost}
                      </Typography>
                      <Button variant="contained" size="large" display="flex" onClick={backToCats}>Continue Shopping</Button>
                    </CardContent>
                  </Box>
              </Card>
      <NavBar/>
    </>
  )
 }

export default ShoppingList