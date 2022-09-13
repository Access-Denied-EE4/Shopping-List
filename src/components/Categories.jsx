import React from 'react';
import {Card, Container, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import ClickToCart from "../images/CTCC.jpg"
import meat from "../images/meat.jpeg";
import chocolate from "../images/chocolate.jpeg";
import dairy from "../images/dairy.webp";
import drinks from "../images/drinks.jpeg";
import readyMade from "../images/readyMade.webp";
import toiletries from "../images/Toiletries.jpeg";
import vegetables from "../images/vegetables.jpeg";
import {Link, useNavigate} from 'react-router-dom';

const Categories = () => {

    const navigate=useNavigate();

    const goToAccount=()=>
    {
        navigate("/account");
    }

    const handleClick=()=>
    {
        console.log("CLICKEDDDD");
    }

  return (

    <>
        <div className='max-w-[700px] mx-auto p-4'>
        <h1 className='text-5xl font-bold py-2 text-center'>Categories</h1>
        </div>
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
                        <img src={meat} style={{cursor:'pointer'}} onClick={()=>navigate('/meat')}></img>
                        <ImageListItemBar 
                        title="Meat Items"/>
                    </ImageListItem>
                </Card>
                <Card key={'dairy'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={dairy} style={{cursor:'pointer'}} onClick={()=>navigate('/dairy')}></img>
                        <ImageListItemBar 
                        title="Dairy Items"/>
                    </ImageListItem>
                </Card>
                <Card key={'drink'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={drinks} style={{cursor:'pointer'}} onClick={()=>navigate('/drink')}></img>
                        <ImageListItemBar 
                        title="Drinks"/>
                    </ImageListItem>
                </Card>
                <Card key={'category4'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={readyMade} style={{cursor:'pointer'}}></img>
                        <ImageListItemBar
                        title={'Ready Made Food'}/>
                    </ImageListItem>
                </Card>
                <Card key={'category5'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={vegetables} style={{cursor:'pointer'}}></img>
                        <ImageListItemBar 
                        title={'Vegetables'}/>
                    </ImageListItem>
                </Card>
                <Card key={'category6'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={chocolate} style={{cursor:'pointer'}}></img>
                        <ImageListItemBar 
                        title={'Sweets and Chocolate'}/>
                    </ImageListItem>
                </Card>
                <Card key={'category7'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={toiletries} style={{cursor:'pointer'}}></img>
                        <ImageListItemBar 
                        title={'Toiletries'}/>
                    </ImageListItem>
                </Card>

            </ImageList>
        </Container>

        <div>
            <button onClick={goToAccount} className='border px-6 py-2 my-4'>
                Go To Account
            </button>
        </div>
    </>
  )
}

export default Categories