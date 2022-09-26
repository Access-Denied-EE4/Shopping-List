
/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent} from '@testing-library/react';
import App from '../App';
import AppTesting from '../AppTester';

describe ("Viewing Categories Testing" ,()=>{

    test('all UI elements are rendered correctly', () => {
       render(<AppTesting/>)

      let Emailinput= screen.getAllByTestId("email input")[0];
      fireEvent.change(Emailinput, {target: {value: 'testing@gmail.com'}})

      let passinput= screen.getAllByTestId("password")[0];
      fireEvent.change(passinput, {target: {value: '123456'}});

    let btnSignIn =screen.getAllByTestId("btn SignIn")[0];
       fireEvent.click(btnSignIn, { button: 0});

     let pagelabel= screen.getAllByText('Categories')[0];
     expect(pagelabel).toBeInTheDocument();

 //categories
     let meat_cat= screen.getAllByTestId('meatcat')[0];
     expect(meat_cat).toBeInTheDocument();

     let veg_cat= screen.getAllByTestId('vegcat')[0];
     expect(veg_cat).toBeInTheDocument();

     let sweet_cat= screen.getAllByTestId('sweetcat')[0];
     expect(sweet_cat).toBeInTheDocument();

     let drink_cat= screen.getAllByTestId('drinkcat')[0];
     expect(drink_cat).toBeInTheDocument();

     let readycat= screen.getAllByTestId('readycat')[0];
     expect(readycat).toBeInTheDocument();

     let toiletries_cat= screen.getAllByTestId('toiletriescat')[0];
     expect(toiletries_cat).toBeInTheDocument();

     let dairy_cat= screen.getAllByTestId('dairycat')[0];
     expect(dairy_cat).toBeInTheDocument();

//titles
     let meat_title= screen.getAllByTestId('meattitle')[0];
     expect(meat_title).toBeInTheDocument();

     let veg_title= screen.getAllByTestId('vegtitle')[0];
     expect(veg_title).toBeInTheDocument();

     let sweet_title= screen.getAllByTestId('sweettitle')[0];
     expect(sweet_title).toBeInTheDocument();

     let drink_title= screen.getAllByTestId('drinktitle')[0];
     expect(drink_title).toBeInTheDocument();

     let ready_title= screen.getAllByTestId('readytitle')[0];
     expect(ready_title).toBeInTheDocument();

     let toiletries_title= screen.getAllByTestId('toiletriestitle')[0];
     expect(toiletries_title).toBeInTheDocument();

     let dairy_title= screen.getAllByTestId('dairytitle')[0];
     expect(dairy_title).toBeInTheDocument();


     //cards
     let meat_card= screen.getAllByTestId('meatcard')[0];
     expect(meat_card).toBeInTheDocument();

     let veg_card= screen.getAllByTestId('vegcard')[0];
     expect(veg_card).toBeInTheDocument();

     let sweet_card= screen.getAllByTestId('sweetcard')[0];
     expect(sweet_card).toBeInTheDocument();

     let ready_card= screen.getAllByTestId('readycard')[0];
     expect(ready_card).toBeInTheDocument();

     let drink_card= screen.getAllByTestId('drinkcard')[0];
     expect(drink_card).toBeInTheDocument();

     let toiletries_card= screen.getAllByTestId('toiletriescard')[0];
     expect(toiletries_card).toBeInTheDocument();

     let dairy_card= screen.getAllByTestId('dairycard')[0];
     expect(dairy_card).toBeInTheDocument();

    });
});