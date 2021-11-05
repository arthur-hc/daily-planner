import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Tabs, Tab } from 'react-bootstrap';
import RedirectTo from '../components/RedirectTo';
import verifyTokenExistance from '../token/verifyTokenExistance';
import fetchGetListById from '../endpoints/fetchGetListById';
import TaskManager from '../components/TaskManager';
import NewTaskForms from '../components/NewTaskForms';
import TaskListOptions from '../components/TaskListOptions';

function TaskListPage({ match }) {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [listData, setListData] = useState({});
  const { id } = match.params;
  const { taskListName } = listData;

  const getTaskListById = async () => {
    const response = await fetchGetListById(id);
    if (response.error) {
      // eslint-disable-next-line no-alert
      alert('Invalid Token or Token Expired');
      setShouldRedirect(true);
      return;
    }
    console.log(response);
    setListData(response);
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
        <h1>{taskListName}</h1>
        <Tabs
          defaultActiveKey="myList"
          id="uncontrolled-tab-example"
          className="mb-3 d-flex"
          onClick={ () => getTaskListById() }
        >
          <Tab
            eventKey="myList"
            title="List"
          >
            <TaskManager
              tasksData={ listData }
              callBackToRefreshList={ getTaskListById }
            />
          </Tab>
          <Tab
            eventKey="newTask"
            title="New Task"
          >
            <NewTaskForms taskListData={ listData } />
          </Tab>
          <Tab
            eventKey="options"
            title="Options"
          >
            <TaskListOptions id={ id } />
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
