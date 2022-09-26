/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent} from '@testing-library/react';
import App from '../App';
import AppTesting from '../AppTester';

describe ("Verify Email Testing" ,()=>{

    test('all UI elements are rendered correctly', () => {
       render(<AppTesting/>)

     let linkSignUp =screen.getAllByTestId("signup link")[0];
     fireEvent.click(linkSignUp, { button: 0});

     let Emailinput= screen.getAllByTestId("email input")[0];
      fireEvent.change(Emailinput, {target: {value: 'test@gmail.com'}})

      let passinput= screen.getAllByTestId("pass input")[0];
      fireEvent.change(passinput, {target: {value: '123456'}});

    let btnSignUp =screen.getAllByTestId("signup button")[0];
       fireEvent.click(btnSignUp, { button: 0});

     let labelInstruct= screen.getAllByText('Please verify your account to complete Sign up!')[0];
     expect(labelInstruct).toBeInTheDocument();

     let labelInstruct2= screen.getAllByText('If this is your first time Signing Up with us the verification email will be in your spam inbox so please be sure to check!')[0];
     expect(labelInstruct2).toBeInTheDocument();

     let btnVerify =screen.getAllByTestId("verify btn")[0];
     expect(btnVerify).toBeInTheDocument();
     fireEvent.click(btnVerify, { button: 0});

     let test =screen.getAllByText("Sign in to your account")[0];
     expect(test).toBeInTheDocument();

    });


});