import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ListCard = ({ title, id }) => (
  <Link to={ `/mylist/${id}` }>
    <Card style={ { width: '18rem' } }>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button variant="primary">See Task List</Button>
      </Card.Body>
    </Card>
  </Link>
);

UserList.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default ListCard;
