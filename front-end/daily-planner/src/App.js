import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import InitialPage from './pages/InitialPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ InitialPage } />
        <Route exact path="/mylists" component={ MyListsPage } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
