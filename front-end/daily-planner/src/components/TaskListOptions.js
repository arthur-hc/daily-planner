import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import RedirectTo from './RedirectTo';

const TaskListOptions = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  return (
    <Container>
      {RedirectTo(shouldRedirect, '/')}
      {' '}
      <Link to="/mylists">
        <Button variant="primary" size="md">
          My Lists
        </Button>
      </Link>
      {' '}
      <Button
        variant="danger"
        onClick={ () => setShouldRedirect(true) }
        size="md"
      >
        Quit
      </Button>
    </Container>
  );
};

export default TaskListOptions;
