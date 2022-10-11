
/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent,within} from '@testing-library/react';
import App from '../App';
import AppTesting from '../AppTester';


describe ("Removing from cart" ,()=>{

    test('Add item and check that items are added successfully', async () => {
       render(<AppTesting/>)

      let Emailinput= screen.getAllByTestId("email input")[0];
      fireEvent.change(Emailinput, {target: {value: 'testing@gmail.com'}})

      let passinput= screen.getAllByTestId("password")[0];
      fireEvent.change(passinput, {target: {value: '123456'}});

    let btnSignIn =screen.getAllByTestId("btn SignIn")[0];
       fireEvent.click(btnSignIn, { button: 0});
     //Get categories as cards to fire on click event
     let back;

     //test adding to cart

     let Cartlbl;

     //navigate to meat page
     let meat_card= screen.getAllByTestId('meatcard')[0];
     fireEvent.click(meat_card, { button: 0});
     expect(global.window.location.href).toContain('/meat');
     //Add meat item to cart
     const AddToCartbtn_meat= screen.getAllByTestId('add to cart button')[0];
     fireEvent.click(AddToCartbtn_meat, { button: 0});
     Cartlbl=screen.getAllByText('Chicken Breast - R120')[0];
     expect(Cartlbl).toBeInTheDocument();
     back= screen.getAllByTestId('back')[0];
     fireEvent.click(back, { button: 0});


    //navigate to dairy page
    let dairy_card= screen.getAllByTestId('dairycard')[0];
    fireEvent.click(dairy_card, { button: 0});
    expect(global.window.location.href).toContain('/dairy');
    //Add dairy item to cart
    const AddToCartbtn_dairy= screen.getAllByTestId('add dairy to cart')[0];
    fireEvent.click(AddToCartbtn_dairy, { button: 0});
    Cartlbl=screen.getAllByText('Butter - R25')[0];
    expect(Cartlbl).toBeInTheDocument();
    back= screen.getAllByTestId('back')[0];
    fireEvent.click(back, { button: 0});

     //navigate to drinks page
    let drink_card= screen.getAllByTestId('drinkcard')[0];
    fireEvent.click(drink_card, { button: 0});
    expect(global.window.location.href).toContain('/drink');
     //Add drink to cart
    const AddToCartbtn_drink= screen.getAllByTestId('add drink to cart')[0];
    fireEvent.click(AddToCartbtn_drink, { button: 0});
    Cartlbl=screen.getAllByText('Sprite - R12')[0];
    expect(Cartlbl).toBeInTheDocument();
    back= screen.getAllByTestId('back')[0];
    fireEvent.click(back, { button: 0});

    //navigate to sweets page
    let sweet_card= screen.getAllByTestId('sweetcard')[0];
    fireEvent.click(sweet_card, { button: 0});
    expect(global.window.location.href).toContain('/sweet');
    //Add sweet to cart
    const AddToCartbtn_sweet= screen.getAllByTestId('add sweet to cart')[0];
    fireEvent.click(AddToCartbtn_sweet, { button: 0});
    Cartlbl=screen.getAllByText('Crunchie - R11')[0];
    expect(Cartlbl).toBeInTheDocument();
    back= screen.getAllByTestId('back')[0];
    fireEvent.click(back, { button: 0});

     //navigate to toiletries page
     let toiletries_card= screen.getAllByTestId('toiletriescard')[0];
     fireEvent.click(toiletries_card, { button: 0});
     expect(global.window.location.href).toContain('/toilet');
      //Add toiletries to cart
     const AddToCartbtn_toilet= screen.getAllByTestId('add toilet to cart')[0];
     fireEvent.click(AddToCartbtn_toilet, { button: 0});
     Cartlbl=screen.getAllByText('Toilet Paper - R150')[0];
     expect(Cartlbl).toBeInTheDocument();
     back= screen.getAllByTestId('back')[0];
     fireEvent.click(back, { button: 0});

      //navigate to veg page
      let veg_card= screen.getAllByTestId('vegcard')[0];
      fireEvent.click(veg_card, { button: 0});
      expect(global.window.location.href).toContain('/veg');
      //Add veg to cart
      const AddToCartbtn_veg= screen.getAllByTestId('add veg to cart')[0];
      fireEvent.click(AddToCartbtn_veg);
      Cartlbl=screen.getAllByText('Apple - R15')[0];
      expect(Cartlbl).toBeInTheDocument();

    });
});