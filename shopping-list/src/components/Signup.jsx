import React, {useRef} from 'react'
import {Form, Button,Card} from 'react-bootstrap'

const Signup = () => {

    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();

  return (
    <>
        {/*fragemnt*/};

        {/* Bootstrap card containing all login info */};
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>

                {/* form for signup-email, password, password confirmation */}
                <Form>
                    {/* email group on form */}
                    <Form.Group if="email">
                        <Form.Label>Email</Form.Label>
                        {/* ref used to get value wehn submitting form*/}
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>

                    {/* password group on form */}
                    <Form.Group if="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>

                    {/* password confirmation group on form */}
                    <Form.Group if="password confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="email" ref={passwordConfirmRef} required/>
                    </Form.Group>

                    {/* w-100 makes button span width of page*/}
                    <Button className="w-100" type="submit">Sign Up</Button>

                </Form>
            </Card.Body>
        </Card>

        {/* div to swap us over to login page */};
        <div className='w-100 text-center mt-2'>
            Already have an account? Log In
        </div>
    </>
  )
}

export default Signup