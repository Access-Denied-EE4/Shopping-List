/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent} from '@testing-library/react';
import AppTesting from '../AppTester';

describe ("Forgot Password testing" ,()=>{
    test('UI rendering and functionality', () => {
       render(<AppTesting/>)




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

      let BtnReset =screen.getAllByTestId("reset btn")[0];
      expect(BtnReset).toBeInTheDocument();

      //test input
      fireEvent.change(Emailinput, {target: {value: 'testing@gmail.com'}});
      expect(Emailinput.value).toBe('testing@gmail.com');
      fireEvent.click(BtnReset, { button: 0});
      expect(global.window.location.href).toContain('/');
     });

});