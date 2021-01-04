import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import JobList from './Queue/JobList.js';
import JobDetail from './Queue/JobDetail.js';
import CreateJob from './Queue/CreateJob.js';
import ResubmitJob from './Queue/ResubmitJob.js';


function App(props) {
  console.log(props.auth.tokenParsed);
  return (
    <Router>
    <header className="navbar navbar-expand navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="/">Job Manager</a>
      <div className="ml-auto order-lg-last">
        <ul className="navbar-nav flex-row">
          <li className="nav-item pr-3 pr-lg-0">
              <a className="nav-link" href="/new">+</a>
          </li>
        </ul>
      </div>
    </header>
    <Switch>
      <Route exact path="/">
          <JobList auth={props.auth} />
      </Route>
      <Route path="/new">
          <CreateJob auth={props.auth} />
      </Route>
      <Route path="/resubmit">
          <ResubmitJob auth={props.auth} />
      </Route>
      <Route path="/:id">
          <JobDetail auth={props.auth} />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
