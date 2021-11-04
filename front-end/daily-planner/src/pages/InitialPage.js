import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import LoginForms from '../components/LoginForms';

function InitialPage() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100 vw-100"
    >
      <div className="border border-1 border-dark rounded p-3 height-375">
        <Tabs
          defaultActiveKey="login"
          id="uncontrolled-tab-example"
          className="mb-3 d-flex"
        >
          <Tab eventKey="login" title="Login">
            <LoginForms />
          </Tab>
          <Tab eventKey="register" title="Register">
            <h1>Register Forms</h1>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

export default InitialPage;
