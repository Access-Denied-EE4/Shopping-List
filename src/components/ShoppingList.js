import React from 'react'
import NavBar from './NavBar'

const ShoppingList = () => {
  return (
    <>
    <div className='text-white border border-mainBlue bg-mainBlue py-1  mb-2'>
        <div >
          <div>
            <h1 className='text-4xl font-bold py-2 text-4xl font-bold py-2 text-center'>Your Cart</h1>
          </div>
        </div>
     </div>

     <NavBar/>
    </>
  )
}

export default ShoppingList