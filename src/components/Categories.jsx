import React from 'react';
import {Card, Container, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import ClickToCart from "../images/CTCC.jpg"
import {Link, useNavigate} from 'react-router-dom';
const Categories = () => {

    const navigate=useNavigate();

    const goToAccount=()=>
    {
        navigate("/account");
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
            }}>
                <Card key={'category1'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={ClickToCart}></img>
                        <ImageListItemBar 
                        title="Category"/>
                    </ImageListItem>
                </Card>
                <Card key={'category2'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={ClickToCart}></img>
                        <ImageListItemBar 
                        title="Category"/>
                    </ImageListItem>
                </Card>
                <Card key={'category3'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={ClickToCart}></img>
                        <ImageListItemBar 
                        title="Category"/>
                    </ImageListItem>
                </Card>
                <Card key={'category4'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={ClickToCart}></img>
                        <ImageListItemBar 
                        title={'Category'}/>
                    </ImageListItem>
                </Card>
                <Card key={'category5'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={ClickToCart}></img>
                        <ImageListItemBar 
                        title={'Category'}/>
                    </ImageListItem>
                </Card>
                <Card key={'category6'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={ClickToCart}></img>
                        <ImageListItemBar 
                        title={'Category'}/>
                    </ImageListItem>
                </Card>
                <Card key={'category7'}>
                    <ImageListItem sx={{height: '100% !important'}}>
                        <img src={ClickToCart}></img>
                        <ImageListItemBar 
                        title={'Category'}/>
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