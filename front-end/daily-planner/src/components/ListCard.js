import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import taskListImg from '../img/tasklist.png';

const ListCard = ({ title, id }) => (

  <Card style={ { width: '10rem', height: '15rem' } }>
    <Card.Body className="d-flex-column">
      <Container className="h-25">
        <Card.Img variant="top" src={ taskListImg } style={ { width: '3rem' } } />
      </Container>
      <Container className="h-50">
        <Card.Title>{title}</Card.Title>
      </Container>
      <Container className="h-25">
        <Link to={ `/mylists/${id}` }>
          <Button variant="primary">See Task List</Button>
        </Link>
      </Container>
    </Card.Body>
  </Card>

);

ListCard.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default ListCard;
