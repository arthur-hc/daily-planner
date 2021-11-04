import React from 'react';
import getTokenInLocalStorage from '../token/getTokenInLocalStorage';

function MyListsPage() {
  return (
    <div>
      <h1>My List Page</h1>
      {getTokenInLocalStorage()}
    </div>
  );
}

export default MyListsPage;
