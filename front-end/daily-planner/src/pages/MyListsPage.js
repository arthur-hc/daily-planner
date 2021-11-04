import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import RedirectTo from '../components/RedirectTo';
import verifyTokenExistance from '../token/verifyTokenExistance';
import fetchGetUserLists from '../endpoints/fetchGetUserLists';
import UserLists from '../components/UserLists';

function MyListsPage() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [userListsData, setUserListsData] = useState([]);

  const getUserLists = async () => {
    const response = await fetchGetUserLists();
    if (response.error) {
      // eslint-disable-next-line no-alert
      alert('Invalid Token or Token Expired');
      setShouldRedirect(true);
      return;
    }
    setUserListsData(response);
  };

  useEffect(() => {
    verifyTokenExistance(setShouldRedirect);
    getUserLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {RedirectTo(shouldRedirect, '/')}
      <h1>My List Page</h1>
      <UserLists list={ userListsData } />
    </Container>
  );
}

export default MyListsPage;
