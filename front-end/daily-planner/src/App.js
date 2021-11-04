import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import InitialPage from './pages/InitialPage';
import MyListsPage from './pages/MyListsPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ InitialPage } />
        <Route exact path="/mylists" component={ MyListsPage } />
        <Route
          path="/mylists/:id"
          render={ (props) => <MyListsPage { ...props } /> }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
