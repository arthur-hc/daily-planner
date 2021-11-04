import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import fetchRegister from '../endpoints/fetchRegister';

function RegisterForms() {
  const [apiMessage, setApiMessage] = useState(false);
  const [alertVariant, setAlertVariant] = useState('danger');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setRegisteredCaseStates = () => {
    const empty = '';
    setAlertVariant('success');
    setApiMessage('Registerd!');
    setName(empty);
    setEmail(empty);
    setPassword(empty);
  };

  const setRegisteredFailedCaseStates = (message) => {
    setAlertVariant('danger');
    if (message.includes('pattern')) {
      setApiMessage('Password must contain letters and numbers');
      return null;
    }
    setApiMessage(message);
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();
    const response = await fetchRegister(name, email, password);
    const { error } = response;
    if (error) {
      setRegisteredFailedCaseStates(error.message);
      return null;
    }
    setRegisteredCaseStates();
  };

  const alertApiMessage = () => {
    if (apiMessage) {
      return (
        <Alert
          className="m-2 mw-100"
          variant={ alertVariant }
        >
          {apiMessage}
        </Alert>
      );
    }
  };

  return (
    <Form
      className="width-300"
      onSubmit={ handleRegisterClick }
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
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
      {alertApiMessage()}
    </Form>
  );
}

export default RegisterForms;
