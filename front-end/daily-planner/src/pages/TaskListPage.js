import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Tabs, Tab } from 'react-bootstrap';
import RedirectTo from '../components/RedirectTo';
import verifyTokenExistance from '../token/verifyTokenExistance';
import fetchGetUserLists from '../endpoints/fetchGetUserLists';
import UserLists from '../components/UserLists';
import NewListForms from '../components/NewListForms';
import MyListsOptions from '../components/MyListsOptions';

function TaskListPage({ match }) {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [userListsData, setUserListsData] = useState([]);
  const { id } = match.params;

  const getTaskListById = async () => {
    const response = await fetchGetUserLists(id);
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
    getTaskListById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="d-flex justify-content-center min-height-100vh vw-100">
      {RedirectTo(shouldRedirect, '/')}
      <div
        className="border border-1 border-dark rounded p-3
        d-flex-column justify-content-center align-items-center w-75"
      >
        <h1>{id}</h1>
        <Tabs
          defaultActiveKey="=list"
          id="uncontrolled-tab-example"
          className="mb-3 d-flex"
          onClick={ () => getUserLists() }
        >
          <Tab
            eventKey="list"
            title="List"
          >
            <UserLists lists={ userListsData } />
          </Tab>
          <Tab
            eventKey="newTask"
            title="New Task"
          >
            <NewListForms />
          </Tab>
          <Tab
            eventKey="options"
            title="Options"
          >
            <MyListsOptions />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

TaskListPage.propTypes = {
  match: PropTypes.func,
}.isRequired;

export default TaskListPage;
