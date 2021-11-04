import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForms from '../components/LoginForms';

function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100 vw-100"
    >
      <LoginForms />
    </Container>
  );
}

export default Login;
