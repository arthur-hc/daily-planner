import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import RedirectTo from './RedirectTo';
import fetchDeleteList from '../endpoints/fetchDeleteListById';

const TaskListOptions = ({ id }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const deleteList = async () => {
    await fetchDeleteList(id);
    setShouldRedirect(true);
  };

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
      <Link to="/mylists">
        <Button variant="warning" size="md" onClick={ () => deleteList() }>
          Delete List
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

TaskListOptions.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default TaskListOptions;
