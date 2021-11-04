import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import RedirectTo from './RedirectTo';

const MyListsOptions = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  return (
    <Container>
      {RedirectTo(shouldRedirect, '/')}
      <Button
        variant="danger"
        onClick={ () => setShouldRedirect(true) }
      >
        Quit
      </Button>
    </Container>
  );
};

export default MyListsOptions;
