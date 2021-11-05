import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectTo = (shouldRedirect, path) => {
  if (shouldRedirect) {
    return (
      <Redirect to={ path } />
    );
  }
};

export default RedirectTo;
