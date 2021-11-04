import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import fetchNewTaskList from '../endpoints/fetchNewTaskList';
import RedirectTo from './RedirectTo';

function NewListForms() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [created, setCreated] = useState(false);
  const [newTaskListName, setNewTaskListName] = useState('');

  const setRegisteredCaseStates = () => {
    const empty = '';
    setCreated(true);
    setNewTaskListName(empty);
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();
    const response = await fetchNewTaskList(newTaskListName);
    const { error } = response;
    if (error) {
      // eslint-disable-next-line no-alert
      alert('Invalid Token or Token Expired');
      setShouldRedirect(true);
      return null;
    }
    setRegisteredCaseStates();
  };

  const createdAlert = () => {
    if (created) {
      return (
        <Alert
          className="m-1"
          variant="success"
        >
          Created!
        </Alert>
      );
    }
  };

  return (
    <Container>
      {RedirectTo(shouldRedirect, '/')}
      <Form
        onSubmit={ handleRegisterClick }
        className="w-50"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>List Name</Form.Label>
          <Form.Control
            placeholder="Enter new list name"
            value={ newTaskListName }
            required
            onChange={ ({ target: { value } }) => setNewTaskListName(value) }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
        {createdAlert()}
      </Form>
    </Container>
  );
}

export default NewListForms;
