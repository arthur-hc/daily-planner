import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import fetchLogin from '../endpoints/fetchLogin';

function LoginForms() {
  const [invalidEntries, setInvalidEntries] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = async (event) => {
    event.preventDefault();
    const response = await fetchLogin(email, password);
    console.log(response);
    if (!email.includes('arthur')) {
      setInvalidEntries(true);
    }
  };

  const alert = () => {
    if (invalidEntries) {
      return (
        <Alert
          className="m-2"
          variant="danger"
          onClick={ () => setInvalidEntries(false) }
        >
          Incorrect Email or Password
        </Alert>
      );
    }
  };

  return (
    <Form
      className="h-50 p-3 border border-1 border-dark rounded max-height-300"
      onSubmit={ handleLoginClick }
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={ email }
          required
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid Email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      {alert()}
    </Form>
  );
}

export default LoginForms;
