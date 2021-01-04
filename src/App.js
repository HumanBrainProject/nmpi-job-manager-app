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
          <JobList />
      </Route>
      <Route path="/new">
          <CreateJob />
      </Route>
      <Route path="/resubmit">
          <ResubmitJob />
      </Route>
      <Route path="/:id">
          <JobDetail />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
