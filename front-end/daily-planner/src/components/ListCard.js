import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import taskListImg from '../img/tasklist.png';

const ListCard = ({ title, id }) => (
  <Link to={ `/mylists/${id}` }>
    <Card style={ { width: '10rem' } }>
      <Card.Img variant="top" src={ taskListImg } style={ { width: '3rem' } } />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button variant="primary">See Task List</Button>
      </Card.Body>
    </Card>
  </Link>
);

ListCard.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default ListCard;
