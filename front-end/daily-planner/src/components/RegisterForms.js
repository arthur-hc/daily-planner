import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function LoginForms() {
  const [invalidEntries, setInvalidEntries] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = async (event) => {
    event.preventDefault();
    const response = 'fech';
    const { error } = response;
    if (error) {
      setInvalidEntries(true);
      return null;
    }
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
      onSubmit={ handleRegisterClick }
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="string"
          placeholder="Enter name"
          value={ name }
          required
          onChange={ ({ target: { value } }) => setName(value) }
        />
      </Form.Group>
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
        Register
      </Button>
      {alertInvalidData()}
    </Form>
  );
}

export default LoginForms;
