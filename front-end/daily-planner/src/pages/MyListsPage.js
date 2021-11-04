import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
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
    <Container className="d-flex justify-content-center vh-100 vw-100">
      {RedirectTo(shouldRedirect, '/')}
      <div
        className="border border-1 border-dark rounded p-3
        d-flex-column justify-content-center align-items-center vh-100 w-75"
      >
        <h1>My Lists</h1>
        <Tabs
          defaultActiveKey="myLists"
          id="uncontrolled-tab-example"
          className="mb-3 d-flex"
        >
          <Tab
            eventKey="myLists"
            title="My Lists"
            className="height-300"
          >
            <UserLists lists={ userListsData } />
          </Tab>
          <Tab
            eventKey="newList"
            title="New List"
            className="height-400"
          >
            <UserLists lists={ userListsData } />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

export default MyListsPage;
