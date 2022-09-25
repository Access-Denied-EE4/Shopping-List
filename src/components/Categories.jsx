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
import NavBar from './NavBar';
import MenuBar from './MenuBar/MenuBar';
import Sidebar from './Sidebar';

const Categories = () => {

    const navigate=useNavigate();

  return (
    <>
      <div className='text-white border border-mainBlue bg-mainBlue py-1  mb-2'>
        <div >
          <div>
            <h1 className='text-4xl font-bold py-2 text-4xl font-bold py-2 text-center'>Categories</h1>
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
                    <Card data-testid="meatcard" key={'meat'}>
                        <ImageListItem data-testid="meatcat" sx={{height: '100% !important'}}>
                            <img src={meat} style={{cursor:'pointer'}} onClick={()=>navigate('/meat')}></img>
                            <ImageListItemBar data-testid="meattitle"
                            title="Meat Items"/>
                        </ImageListItem>
                    </Card>
                    <Card data-testid="dairycard" key={'dairy'}>
                        <ImageListItem data-testid="dairycat" sx={{height: '100% !important'}}>
                            <img src={dairy} style={{cursor:'pointer'}} onClick={()=>navigate('/dairy')}></img>
                            <ImageListItemBar data-testid="dairytitle"
                            title="Dairy Items"/>
                        </ImageListItem>
                    </Card>
                    <Card data-testid="drinkcard" key={'drink'}>
                        <ImageListItem data-testid="drinkcat" sx={{height: '100% !important'}}>
                            <img src={drinks} style={{cursor:'pointer'}} onClick={()=>navigate('/drink')}></img>
                            <ImageListItemBar data-testid="drinktitle"
                            title="Drinks"/>
                        </ImageListItem>
                    </Card>
                    <Card  data-testid="readycard" key={'ready'}>
                        <ImageListItem data-testid="readycat" sx={{height: '100% !important'}}>
                            <img src={readyMade} style={{cursor:'pointer'}} onClick={()=>navigate('/ready')}></img>
                            <ImageListItemBar data-testid="readytitle"
                            title={'Ready Made Food'}/>
                        </ImageListItem>
                    </Card>
                    <Card data-testid="vegcard" key={'veg'}>
                        <ImageListItem data-testid="vegcat" sx={{height: '100% !important'}}>
                            <img src={vegetables} style={{cursor:'pointer'}} onClick={()=>navigate('/veg')}></img>
                            <ImageListItemBar data-testid="vegtitle"
                            title={'Vegetables'}/>
                        </ImageListItem>
                    </Card>
                    <Card  data-testid="sweetcard" key={'sweet'}>
                        <ImageListItem data-testid="sweetcat" sx={{height: '100% !important'}}>
                            <img src={chocolate} style={{cursor:'pointer'}} onClick={()=>navigate('/sweet')}></img>
                            <ImageListItemBar data-testid="sweettitle"
                            title={'Sweets and Chocolate'}/>
                        </ImageListItem>
                    </Card>
                    <Card data-testid="toiletriescard" key={'category7'}>
                        <ImageListItem data-testid="toiletriescat" sx={{height: '100% !important'}}>
                            <img src={toiletries} style={{cursor:'pointer'}} onClick={()=>navigate('/toilet')}></img>
                            <ImageListItemBar data-testid="toiletriestitle"
                            title={'Toiletries'}/>
                        </ImageListItem>
                    </Card>
                </ImageList>
            </Container>
        <NavBar/>
    </>
  )
}

export default Categories