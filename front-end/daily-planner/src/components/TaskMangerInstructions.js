import React from 'react';
import { Alert } from 'react-bootstrap';

const TaskMangerInstructions = () => (
  <Alert variant="danger">
    Press
    {' '}
    <Alert.Link href="#">Double Click</Alert.Link>
    {' '}
    or
    {' '}
    <Alert.Link href="#">Auxiliar Click (Scroll Btn)</Alert.Link>
    {' '}
    send Task to the Next or Previus Stage, respectively.
  </Alert>
);

export default TaskMangerInstructions;
