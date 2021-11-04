import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const UserList = ({ lists }) => {
  if (lists.length === 0) {
    return (
      <Container>NO LISTS YET</Container>
    );
  }

  return (
    <Container>
      {lists.map((list, index) => (
        <span key={ index }>{list.taskListName}</span>
      ))}
    </Container>
  );
};

UserList.propTypes = ({
  lists: PropTypes.array,
}).isRequired;

export default UserList;
