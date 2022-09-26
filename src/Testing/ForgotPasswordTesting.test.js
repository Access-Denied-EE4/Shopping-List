/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent} from '@testing-library/react';
import App from '../App';
import AppTesting from '../AppTester';

describe ("Forgot Password testing" ,()=>{
    test('all UI elements are rendered correctly', () => {
       render(<AppTesting/>)

       let link =screen.getAllByTestId("signup link")[0];
       expect(link).toBeInTheDocument();
       fireEvent.click(link, { button: 0});

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