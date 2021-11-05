import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import fetchEditTaskList from '../endpoints/fetchEditTaskList';
import RedirectTo from './RedirectTo';

function NewTaskForms({ taskListData }) {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [alertVariant, setAlertVariant] = useState('danger');
  const [feedBack, setFeedBack] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const { tasks } = taskListData;

  const setRegisteredCaseStates = () => {
    const empty = '';
    setAlertVariant('success');
    setFeedBack('Created!');
    setNewTaskName(empty);
  };

  const setFailureCaseStates = () => {
    setAlertVariant('danger');
    setFeedBack('This task already exists!');
  };

  const taskExists = () => {
    if (tasks) {
      const { ToDo, InProgress, Done } = tasks;
      const allTasks = [...ToDo, ...InProgress, ...Done];
      const searchResult = allTasks.find((task) => task === newTaskName);
      return searchResult;
    }
  };

  const handleCreateClick = async (event) => {
    event.preventDefault();
    // THIS IF PREVENT CRASH WHEN TASKS ARE LODING
    if (!tasks) {
      // eslint-disable-next-line no-alert
      alert('Await, tasks are loading');
      return;
    }

    if (taskExists()) {
      setFailureCaseStates();
      return;
    }

    const { ToDo } = tasks;
    ToDo.push(newTaskName);

    const response = await fetchEditTaskList(taskListData);
    const { error } = response;
    if (error) {
      // eslint-disable-next-line no-alert
      alert('Invalid Token or Token Expired');
      setShouldRedirect(true);
      return null;
    }
    setRegisteredCaseStates();
  };

  const alertFeedBackClick = () => {
    if (feedBack) {
      return (
        <Alert
          className="m-1"
          variant={ alertVariant }
        >
          {feedBack}
        </Alert>
      );
    }
  };

  return (
    <Container>
      {RedirectTo(shouldRedirect, '/')}
      <Form
        onSubmit={ handleCreateClick }
        className="w-50"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task</Form.Label>
          <Form.Control
            placeholder="Enter new task"
            value={ newTaskName }
            required
            onChange={ ({ target: { value } }) => setNewTaskName(value) }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
        {alertFeedBackClick()}
      </Form>
    </Container>
  );
}

NewTaskForms.propTypes = {
  taskListData: PropTypes.array,
}.isRequired;

export default NewTaskForms;
