// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Card, ListGroup } from 'react-bootstrap';

const TaskManager = ({ tasksData, callBackToRefreshList }) => {
  // const [shouldRedirect, setShouldRedirect] = useState(false);
  // const [listData, setListData] = useState({});
  const { tasks } = tasksData;

  if (!tasks) {
    return (
      <Container>
        NO TASKS YET
      </Container>
    );
  }
  console.log(callBackToRefreshList);
  console.log(tasksData.tasks);
  const { ToDo, InProgress, Done } = tasks;
  console.log(ToDo, InProgress, Done);

  return (
    <Container className="d-flex-column">
      <Card className="m-4">
        <Card.Header>To Do:</Card.Header>
        <ListGroup variant="flush">
          {ToDo.map((task, index) => (
            <ListGroup.Item key={ index }>{task}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card className="m-4">
        <Card.Header>In Progress:</Card.Header>
        <ListGroup variant="flush">
          {InProgress.map((task, index) => (
            <ListGroup.Item key={ index }>{task}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card className="m-4">
        <Card.Header>Done:</Card.Header>
        <ListGroup variant="flush">
          {Done.map((task, index) => (
            <ListGroup.Item key={ index }>{task}</ListGroup.Item>
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
