import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Container, Row, Col } from 'react-bootstrap';
import ListCard from './ListCard';

const UserList = ({ lists }) => {
  if (lists.length === 0) {
    return (
      <Container>NO LISTS YET</Container>
    );
  }

  return (
    <CardGroup>
      <Row xs={ 1 } md={ 4 } className="g-1">
        {lists.map((list, index) => (
          <Col key={ index }>
            <ListCard title={ list.taskListName } id={ 1 } />
          </Col>
        ))}
      </Row>
    </CardGroup>
  );
};

UserList.propTypes = ({
  lists: PropTypes.array,
}).isRequired;

export default UserList;
