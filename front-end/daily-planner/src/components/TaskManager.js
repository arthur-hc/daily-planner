// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Card, ListGroup } from 'react-bootstrap';
import fetchEditTaskList from '../endpoints/fetchEditTaskList';

const TaskManager = ({ tasksData, callBackToRefreshList }) => {
  const { tasks } = tasksData;

  if (!tasks) {
    return (
      <Container>
        NO TASKS YET
      </Container>
    );
  }

  const { ToDo, InProgress, Done } = tasks;

  const next = async (currentArray, nextArray, item) => {
    const indexToRemove = currentArray.indexOf(item);
    currentArray.splice(indexToRemove, 1);
    nextArray.push(item);
    await fetchEditTaskList(tasksData);
    await callBackToRefreshList();
  };

  const back = async (currentArray, previusArray, item) => {
    const indexToRemove = currentArray.indexOf(item);
    currentArray.splice(indexToRemove, 1);
    previusArray.push(item);
    await fetchEditTaskList(tasksData);
    await callBackToRefreshList();
  };

  return (
    <Container className="d-flex-column">
      <Card className="m-4">
        <Card.Header>To Do:</Card.Header>
        <ListGroup variant="flush">
          {ToDo.map((task, index) => (
            <ListGroup.Item
              key={ index }
              onDoubleClick={ () => next(ToDo, InProgress, task) }
            >
              {task}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card className="m-4">
        <Card.Header>In Progress:</Card.Header>
        <ListGroup variant="flush">
          {InProgress.map((task, index) => (
            <ListGroup.Item
              key={ index }
              onDoubleClick={ () => next(InProgress, Done, task) }
              onAuxClick={ () => back(InProgress, ToDo, task) }
            >
              {task}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card className="m-4">
        <Card.Header>Done:</Card.Header>
        <ListGroup variant="flush">
          {Done.map((task, index) => (
            <ListGroup.Item
              key={ index }
              onDoubleClick={ () => next(Done, [], task) }
              onAuxClick={ () => back(Done, InProgress, task) }
            >
              {task}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

TaskManager.propTypes = ({
  tasksData: PropTypes.object,
  callBackToRefreshList: PropTypes.func,
}).isRequired;

export default TaskManager;
