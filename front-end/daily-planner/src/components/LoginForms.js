import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import fetchLogin from '../endpoints/fetchLogin';
import RedirectTo from './RedirectTo';
import setTokenInLocalStorage from '../token/setTokenInLocalStorage';

function LoginForms() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [invalidEntries, setInvalidEntries] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = async (event) => {
    event.preventDefault();
    const response = await fetchLogin(email, password);
    const { error } = response;
    if (error) {
      setInvalidEntries(true);
      return null;
    }
    setTokenInLocalStorage(response.token);
    setShouldRedirect(true);
  };

  const alertInvalidData = () => {
    if (invalidEntries) {
      return (
        <Alert
          className="m-2"
          variant="danger"
        >
          Incorrect Email or Password
        </Alert>
      );
    }
  };

  return (
    <Form
      className="h-50"
      onSubmit={ handleLoginClick }
    >
      {RedirectTo(shouldRedirect, '/mylists')}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={ email }
          required
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
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
      {alertInvalidData()}
    </Form>
  );
}

export default LoginForms;
