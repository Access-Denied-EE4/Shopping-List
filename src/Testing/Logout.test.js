/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent} from '@testing-library/react';
import AppTesting from '../AppTester';

describe ("Logout testing" ,()=>{
    test('Testing functionailty and rendering', () => {
       render(<AppTesting/>)

    //log in inorder to logout
     let Eminput= screen.getAllByTestId("email input")[0];
     let passinput= screen.getAllByTestId("password")[0];
     let btnSignIn= screen.getAllByTestId("btn SignIn")[0];
     fireEvent.change(Eminput, {target: {value: 'logouttesting@gmail.com'}});
     fireEvent.change(passinput, {target: {value: '123456'}});
     fireEvent.click(btnSignIn, { button: 0});


     let heading= screen.getAllByText('Account')[0];
     expect(heading).toBeInTheDocument();

     let label_user=screen.getAllByTestId("useremail")[0];
     expect(label_user).toBeInTheDocument();

    //check that account is displaying the correct email
     expect(screen.getAllByText("User Email: logouttesting@gmail.com")[0]).toBeInTheDocument();

     let btnLogout= screen.getAllByTestId("btn logout")[0];
     expect(btnLogout).toBeInTheDocument();

     //test logout button
     fireEvent.click(btnLogout, { button: 0});
     expect(global.window.location.href).toContain('/');


   });
});
