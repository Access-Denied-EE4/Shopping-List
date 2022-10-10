/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent} from '@testing-library/react';
import AppTesting from '../AppTester';

describe ("Signin testing" ,()=>{
    test('Testing functionailty and rendering', () => {
       render(<AppTesting/>)


       //get elements to be tested
     let labelInst= screen.getAllByText('Sign in to your account')[0];
     let labelNewAcc= screen.getAllByText('Dont have an account yet?')[0];
     let labelEmail= screen.getAllByText('Email Address')[0];
     let Eminput= screen.getAllByTestId("email input")[0];
     let labelpass= screen.getAllByText('Password')[0];
     let passinput= screen.getAllByTestId("password")[0];
     let btnSignIn= screen.getAllByTestId("btn SignIn")[0];


     //check that UI is rendered correctly
     expect(labelInst).toBeInTheDocument();
     expect(labelNewAcc).toBeInTheDocument();
     expect(labelEmail).toBeInTheDocument();
     expect(Eminput).toBeInTheDocument();
     expect(labelpass).toBeInTheDocument();
     expect(passinput).toBeInTheDocument();

     //check functionaily of input

     //invalid credentials
     fireEvent.change(Eminput, {target: {value: 'Invalid@gmail.com'}});
     expect(Eminput.value).toBe('Invalid@gmail.com');
     fireEvent.change(passinput, {target: {value: '123456'}});
     expect(passinput.value).toBe('123456');

     //user should stay on sign in page if invalid credentials are entered
     fireEvent.click(btnSignIn, { button: 0});
     expect(global.window.location.href).toContain('/');

     //valid credentials
     fireEvent.change(Eminput, {target: {value: 'testing@gmail.com'}});
     expect(Eminput.value).toBe('testing@gmail.com');
     fireEvent.change(passinput, {target: {value: '123456'}});
     expect(passinput.value).toBe('123456');

     //user should be shown the categories page if valid credentials are given
     fireEvent.click(btnSignIn, { button: 0});
     expect(global.window.location.href).toContain('/categories');

   });
});