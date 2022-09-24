/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent} from '@testing-library/react';
import App from './App';
import AppTesting from './AppTester';
import { Passwords_Match } from './contexts/AuthContext';
import { Valid_Email } from "./contexts/AuthContext";
import { Email_Entered } from "./contexts/AuthContext";
import { Approve_Sign_in } from "./contexts/AuthContext";
import { view } from '@testing-library/react';
import {Signup } from './components/Signup';
import { Validate_SignIn } from './contexts/AuthContext';
import { CheckPassLength } from './contexts/AuthContext';
import Signin from "./components/Signin";


describe ("login testing" ,()=>{
     test('All UI elements are rendered correctly', () => {
        render(<AppTesting/>)
      let labelInst= screen.getAllByText('Sign in to your account')[0];
        expect(labelInst).toBeInTheDocument();

      let labelNewAcc= screen.getAllByText('Dont have an account yet?')[0];
        expect(labelNewAcc).toBeInTheDocument();

      let labelEmail= screen.getAllByText('Email Address')[0];
        expect(labelEmail).toBeInTheDocument();

      let Eminput= screen.getAllByTestId("email input")[0];
      expect(Eminput).toBeInTheDocument();


      let labelpass= screen.getAllByText('Password')[0];
        expect(labelpass).toBeInTheDocument();

      let passinput= screen.getAllByTestId("password")[0];
      expect(passinput).toBeInTheDocument();
    });
});


describe ("Sign Up Testing" ,()=>{
    test('all UI elements are rendered correctly', () => {
       render(<AppTesting/>)
       let link =screen.getAllByTestId("signup link")[0];
       expect(link).toBeInTheDocument();
       fireEvent.click(link, { button: 0});

       let labelInstruct= screen.getAllByText('Sign up for a free account')[0];
       expect(labelInstruct).toBeInTheDocument();

       let labelQuest= screen.getAllByText('Already have an account?')[0];
       expect(labelQuest).toBeInTheDocument();

       let labelEmail= screen.getAllByText('Email Address')[0];
       expect(labelEmail).toBeInTheDocument();

      let Emailinput= screen.getAllByTestId("email input")[0];
      expect(Emailinput).toBeInTheDocument();

       let labelPass= screen.getAllByText('Password')[0];
       expect(labelPass).toBeInTheDocument();

      let passinput= screen.getAllByTestId("pass input")[0];
      expect(passinput).toBeInTheDocument();

     });

});


describe ("Forgot Password testing" ,()=>{
    test('all UI elements are rendered correctly', () => {
       render(<AppTesting/>)
       let linkSignIn =screen.getAllByTestId("sign in")[0];
       fireEvent.click(linkSignIn, { button: 0});

       let linkForgotPass =screen.getAllByTestId("forgot password")[0];
       fireEvent.click(linkForgotPass, { button: 0});

       let labelReset= screen.getAllByText('Reset Password')[0];
       expect(labelReset).toBeInTheDocument();

       let labelInstr= screen.getAllByText('Enter your email address below to reset your password!')[0];
       expect(labelInstr).toBeInTheDocument();

       let labelEmail= screen.getAllByText('Email Address')[0];
       expect(labelEmail).toBeInTheDocument();

      let Emailinput= screen.getAllByTestId("email")[0];
      expect(Emailinput).toBeInTheDocument();

      let linkSignin =screen.getAllByTestId("signin")[0];
      expect(linkSignin).toBeInTheDocument();

     });

});

describe ("Verify Email Testing" ,()=>{
    test('all UI elements are rendered correctly', () => {
       render(<AppTesting/>)
       let linkSignIn =screen.getAllByTestId("signin")[0];
       expect(linkSignIn).toBeInTheDocument();
       fireEvent.click(linkSignIn, { button: 0});
/*
     let linkSignUp =screen.getAllByTestId("signup link")[0];
     fireEvent.click(linkSignUp, { button: 0});

     let labelInstruct= screen.getAllByText('Sign up for a free account')[0];
     expect(labelInstruct).toBeInTheDocument();

      let Emailinput= screen.getAllByTestId("email input")[0];
      fireEvent.change(Emailinput, {target: {value: 'testing2@gmail.com'}})

      let passinput= screen.getAllByTestId("pass input")[0];
      fireEvent.change(passinput, {target: {value: '123456'}});

       let btnSignUp =screen.getAllByTestId("signup button")[0];
       fireEvent.click(btnSignUp, { button: 0});

      //expect(btnSignUp).toBeInTheDocument();

    //  Please verify your account to complete Sign up!
 //   let labelInstruct2= screen.getAllByText('Please verify your account to complete Sign up!')[0];
  //   expect(labelInstruct2).toBeInTheDocument();
*/

     });

});




test('case when passwords match', () => {
    const pass = "check1";
    const rep_pass = "check1";
    expect(Passwords_Match(pass, rep_pass)).toBe(true);

});

test('case when passwords do not match', () => {
    const pass = "check2";
    const rep_pass = "check_2";
    expect(Passwords_Match(pass, rep_pass)).toBe(false);

});

test('Case for valid email', () => {
    const email = "test@gmail.com";
    expect(Valid_Email(email)).toBe(true);

});
test('Case for invalid email', () => {
    const email = "emailgmail.com";
    expect(Valid_Email(email)).toBe(false);

});

test('Case if email is entered', () => {
    const email = "emailgmail.com";
    expect(Email_Entered(email)).toBe(true);

});
test('Case if email is not entered', () => {
    const email = "";
    expect(Email_Entered(email)).toBe(false);

});

test('Case when email and password is entered', () => {
    const email = "test@gmail.com";
    const pass = "testpass";
    expect(Approve_Sign_in(email, pass)).toBe(true);
});


test('Case when email is entered and not password', () => {
    const email = "testing@gmail.com";
    const pass = "";
    expect(Approve_Sign_in(email, pass)).toBe(false);
});

test('Case when password is entered and not email', () => {
    const email = "";
    const pass = "testpass";
    expect(Approve_Sign_in(email, pass)).toBe(false);
});

test('Case when password and email is not entered', () => {
    const email = "";
    const pass = "";
    expect(Approve_Sign_in(email, pass)).toBe(false);
});

test('Testing error messages when signing in #1 :Approve', () => {
    const email = "test@gmail.com";
    const pass = "test";
    expect(Validate_SignIn(pass, email)).toBe('Approve');
});

test('Testing error messages when signing in #2', () => {
    const email = "test@gmail.com";
    const pass = "";
    expect(Validate_SignIn(pass, email)).toBe('Please enter your password.');
});
test('Testing error messages when signing in #3', () => {
    const email = "";
    const pass = "";
    expect(Validate_SignIn(pass, email)).toBe('Please enter an email address and password.');
});
test('Testing error messages when signing in #4', () => {
    const email = "";
    const pass = "test";
    expect(Validate_SignIn(pass, email)).toBe('Please enter an email address.');
});

test('Password for new account has length>6', () => {
    const pass = "test123";
    expect(CheckPassLength(pass)).toBe(true);
});

test('Password for new account has length=6', () => {
    const pass = "test12";
    expect(CheckPassLength(pass)).toBe(true);
});

test('Password for new account has length<6', () => {
    const pass = "test1";
    expect(CheckPassLength(pass)).toBe(false);
});