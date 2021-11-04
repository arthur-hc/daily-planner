import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import RedirectTo from '../components/RedirectTo';
import verifyTokenExistance from '../token/verifyTokenExistance';

function MyListsPage() {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    verifyTokenExistance(setShouldRedirect);
  }, [shouldRedirect]);

  return (
    <Container>
      {RedirectTo(shouldRedirect, '/')}
      <h1>My List Page</h1>
    </Container>
  );
}

export default MyListsPage;
