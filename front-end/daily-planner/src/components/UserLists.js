import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Container, Row, Col } from 'react-bootstrap';
import ListCard from './ListCard';

const UserList = ({ lists }) => {
  if (lists.length === 0) {
    return (
      <Container>
        NO LISTS YET
      </Container>
    );
  }

  return (
    <CardGroup>
      <Row xs={ 1 } md={ 4 } className="g-1 w-100">
        {lists.map(({ taskListName, _id }, index) => (
          <Col key={ index }>
            <ListCard title={ taskListName } id={ _id } />
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
