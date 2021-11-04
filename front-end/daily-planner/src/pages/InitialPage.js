import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import LoginForms from '../components/LoginForms';
import RegisterForms from '../components/RegisterForms';

function InitialPage() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100 vw-100"
    >
      <div
        className="border border-1 border-dark rounded p-3
        d-flex-column justify-content-center align-items-center"
      >
        <Tabs
          defaultActiveKey="login"
          id="uncontrolled-tab-example"
          className="mb-3 d-flex"
        >
          <Tab
            eventKey="login"
            title="Login"
            className="height-300"
          >
            <LoginForms />
          </Tab>
          <Tab eventKey="register" title="Register" className="height-400">
            <RegisterForms />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

export default InitialPage;
