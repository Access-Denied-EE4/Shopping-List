
/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen ,fireEvent} from '@testing-library/react';
import App from '../App';
import AppTesting from '../AppTester';

import { Passwords_Match } from '../contexts/AuthContext';
import { Valid_Email } from "../contexts/AuthContext";
import { Email_Entered } from "../contexts/AuthContext";
import { Approve_Sign_in } from "../contexts/AuthContext";
import { Validate_SignIn } from '../contexts/AuthContext';
import { CheckPassLength } from '../contexts/AuthContext';

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