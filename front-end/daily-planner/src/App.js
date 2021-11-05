import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import InitialPage from './pages/InitialPage';
import MyListsPage from './pages/MyListsPage';
import TaskListPage from './pages/TaskListPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ InitialPage } />
        <Route exact path="/mylists" component={ MyListsPage } />
        <Route
          path="/mylists/:id"
          render={ (props) => <TaskListPage { ...props } /> }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
