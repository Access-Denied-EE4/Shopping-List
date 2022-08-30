import { render, screen } from '@testing-library/react';
import App from './App';
import { Passwords_Match } from './contexts/AuthContext';
import { Valid_Email } from "./contexts/AuthContext";
import { Email_Entered } from "./contexts/AuthContext";
import { view } from '@testing-library/react';
import { Signup } from './components/Signup';




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
    const email = "email@gmail.com";
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