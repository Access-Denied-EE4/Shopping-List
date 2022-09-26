/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent} from '@testing-library/react';
import AppTesting from '../AppTester';

describe ("Sign Up Testing" ,()=>{
    test('all UI elements are rendered correctly', () => {
       render(<AppTesting/>)

       //components to be tested
      let link =screen.getAllByTestId("signup link")[0];
      expect(link).toBeInTheDocument();
      fireEvent.click(link, { button: 0}); //to navigate to the signup page
      let labelInstruct= screen.getAllByText('Sign up for a free account')[0];
      let labelQuest= screen.getAllByText('Already have an account?')[0];
      let labelEmail= screen.getAllByText('Email Address')[0];
      let Emailinput= screen.getAllByTestId("email input")[0];
      let labelPass= screen.getAllByText('Password')[0];
      let passinput= screen.getAllByTestId("pass input")[0];
      let btnSignUp= screen.getAllByTestId("signup button")[0];


     //check that UI renders correctly
      expect(labelInstruct).toBeInTheDocument();
      expect(labelQuest).toBeInTheDocument();
      expect(labelEmail).toBeInTheDocument();
      expect(Emailinput).toBeInTheDocument();
      expect(labelPass).toBeInTheDocument();
      expect(passinput).toBeInTheDocument();

       //check functionaily of input

     //invalid credentials
     fireEvent.change(Emailinput, {target: {value: 'Invalid@gmail.com'}});
     expect(Emailinput.value).toBe('Invalid@gmail.com');
     fireEvent.change(passinput, {target: {value: '1234'}});
     expect(passinput.value).toBe('1234');

     //user should stay on sign in page if invalid credentials are entered
     fireEvent.click(btnSignUp, { button: 0});
     expect(global.window.location.href).toContain('/signup');

     //valid credentials
     fireEvent.change(Emailinput, {target: {value: 'test@gmail.com'}});
     expect(Emailinput.value).toBe('test@gmail.com');
     fireEvent.change(passinput, {target: {value: '123456'}});
     expect(passinput.value).toBe('123456');

     //user should be shown the verification page if valid credentials are given
     fireEvent.click(btnSignUp, { button: 0});
     expect(global.window.location.href).toContain('/verification');

     });

});