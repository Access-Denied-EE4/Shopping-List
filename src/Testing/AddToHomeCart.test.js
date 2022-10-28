
/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent,within} from '@testing-library/react';
import App from '../App';
import { GetCartItems ,removeItemFromCart,GetHomeCart,TickOffItem,GetCartItem} from "../contexts/AuthContext";
import AppTesting from '../AppTester';


describe ("Ticking item and adding to home cart" ,()=>{

   test('Add item and then move it to home cart', async () => {
      render(<AppTesting/>)

     let Emailinput= screen.getAllByTestId("email input")[0];
     fireEvent.change(Emailinput, {target: {value: 'testing@gmail.com'}})

     let passinput= screen.getAllByTestId("password")[0];
     fireEvent.change(passinput, {target: {value: '123456'}});

    let btnSignIn =screen.getAllByTestId("btn SignIn")[0];
    fireEvent.click(btnSignIn, { button: 0});

    let back;
    let Cartlbl;


    //adding chicken breast to cart R120
    let meat_card= screen.getAllByTestId('meatcard')[0];
    fireEvent.click(meat_card, { button: 0});
    const AddToCartbtn_meat= screen.getAllByTestId('add to cart button')[0];
    fireEvent.click(AddToCartbtn_meat, { button: 0});
    back= screen.getAllByTestId('back')[0];
    fireEvent.click(back, { button: 0});

    //Add sprite to cart R12
   let drink_card= screen.getAllByTestId('drinkcard')[0];
   fireEvent.click(drink_card, { button: 0});
   const AddToCartbtn_drink= screen.getAllByTestId('add drink to cart')[0];
   fireEvent.click(AddToCartbtn_drink, { button: 0});
   back= screen.getAllByTestId('back')[0];
   fireEvent.click(back, { button: 0});

   //navigate crunchie to cart R11
   let sweet_card= screen.getAllByTestId('sweetcard')[0];
   fireEvent.click(sweet_card, { button: 0});
   const AddToCartbtn_sweet= screen.getAllByTestId('add sweet to cart')[0];
   fireEvent.click(AddToCartbtn_sweet, { button: 0});
   back= screen.getAllByTestId('back')[0];
   fireEvent.click(back, { button: 0});

   let HomeCart=GetHomeCart();//get items in home cart
   let Shopping_cart=GetCartItem();//get shopping cart

   expect(HomeCart.length).toBe(0);//check that home cart is empty because we have not ticked off any items
   expect(Shopping_cart.length).toBe(3);//check that shopping cart has the 3 items that we added

   //tick of chicken breast as bought
   TickOffItem(HomeCart,"Chicken Breast",Shopping_cart);
   expect(HomeCart.includes("Chicken Breast")).toBe(true);
   expect(Shopping_cart.includes("Chicken Breast")).toBe(false);

   //tick of chicken Sprite as bought
   TickOffItem(HomeCart,"Sprite",Shopping_cart);
   expect(HomeCart.includes("Sprite")).toBe(true);
   expect(Shopping_cart.includes("Sprite")).toBe(false);

    //tick of chicken crunchie as bought
   TickOffItem(HomeCart,"Crunchie",Shopping_cart);
   expect(HomeCart.includes("Crunchie")).toBe(true);
   expect(Shopping_cart.includes("Crunchie")).toBe(false);


   });

});