import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
// import fetchNewTaskList from '../endpoints/fetchNewTaskList';

function RegisterForms() {
  const [apiMessage, setApiMessage] = useState(false);
  const [alertVariant, setAlertVariant] = useState('danger');
  const [newTaskListName, setNewTaskListName] = useState('');

  const setRegisteredCaseStates = () => {
    const empty = '';
    setAlertVariant('success');
    setApiMessage('Created!');
    setNewTaskListName(empty);
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();
    const response = await 'fetch';
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
      onSubmit={ handleRegisterClick }
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>List Name</Form.Label>
        <Form.Control
          placeholder="Enter list name"
          value={ newTaskListName }
          required
          onChange={ ({ target: { value } }) => setNewTaskListName(value) }
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
      {alertApiMessage()}
    </Form>
  );
}

export default RegisterForms;
