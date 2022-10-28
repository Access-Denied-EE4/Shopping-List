
/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent,within} from '@testing-library/react';
import App from '../App';
import { GetCartItems ,removeItemFromCart,GetHomeCart,GetCurrentCartPrice} from "../contexts/AuthContext";
import AppTesting from '../AppTester';


describe ("Tracking cart prices" ,()=>{

   test('Add item and check price', async () => {
      render(<AppTesting/>)

     let Emailinput= screen.getAllByTestId("email input")[0];
     fireEvent.change(Emailinput, {target: {value: 'testing@gmail.com'}})

     let passinput= screen.getAllByTestId("password")[0];
     fireEvent.change(passinput, {target: {value: '123456'}});

    let btnSignIn =screen.getAllByTestId("btn SignIn")[0];
    fireEvent.click(btnSignIn, { button: 0});

    let back;
    let Cartlbl;
    let total=0;

    //adding chicken breast to cart R120
    let meat_card= screen.getAllByTestId('meatcard')[0];
    fireEvent.click(meat_card, { button: 0});
    const AddToCartbtn_meat= screen.getAllByTestId('add to cart button')[0];
    fireEvent.click(AddToCartbtn_meat, { button: 0});
    back= screen.getAllByTestId('back')[0];
    fireEvent.click(back, { button: 0});

    //check new cart total
    total=GetCurrentCartPrice();
    expect(total).toBe(120);

    //Add sprite to cart R12
   let drink_card= screen.getAllByTestId('drinkcard')[0];
   fireEvent.click(drink_card, { button: 0});
   const AddToCartbtn_drink= screen.getAllByTestId('add drink to cart')[0];
   fireEvent.click(AddToCartbtn_drink, { button: 0});
   back= screen.getAllByTestId('back')[0];
   fireEvent.click(back, { button: 0});

   //check new cart total
   total=GetCurrentCartPrice();
   expect(total).toBe(120+12);

   //navigate crunchie to cart R11
   let sweet_card= screen.getAllByTestId('sweetcard')[0];
   fireEvent.click(sweet_card, { button: 0});
   const AddToCartbtn_sweet= screen.getAllByTestId('add sweet to cart')[0];
   fireEvent.click(AddToCartbtn_sweet, { button: 0});
   back= screen.getAllByTestId('back')[0];
   fireEvent.click(back, { button: 0});

     //check new cart total
   total=GetCurrentCartPrice();
   expect(total).toBe(120+12+11);

   let cartItems=GetCartItems();

   //now remove from cart and check that the total adjusts accordingly
    removeItemFromCart(cartItems,0); //remove first item

     //check new cart total after removal
     total=GetCurrentCartPrice();
     expect(total).toBe(120+12+11 -120);


   //now remove from cart and check that the total adjusts accordingly
    removeItemFromCart(cartItems,1); //remove second item

    //check new cart total after removal
    total=GetCurrentCartPrice();
    expect(total).toBe(120+12+11 -120-12);


   //now remove from cart and check that the total adjusts accordingly
   removeItemFromCart(cartItems,3); //remove third item

   //check new cart total after removal
   total=GetCurrentCartPrice();
   expect(total).toBe(120+12+11 -120-11-12);

   });

});