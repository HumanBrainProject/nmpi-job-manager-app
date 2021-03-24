import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core';

import './App.css';
import JobList from './Queue/JobList.js';
import JobDetail from './Queue/JobDetail.js';
import CreateJob from './Queue/CreateJob.js';
import ResubmitJob from './Queue/ResubmitJob.js';


const useStyles = makeStyles((theme) => ({
  plainLink: {
    color: 'white'
  }
}));


function App(props) {
  //console.log(props.auth.tokenParsed);
  const classes = useStyles();

  const [currentCollab, setCurrentCollab] = React.useState(null);

  React.useEffect(() => {
    let params = (new URL(document.location)).searchParams;
    let requestedCollabId = params.get('collab_id');
    if (requestedCollabId) {
      setCurrentCollab(requestedCollabId);
    }
    console.log(`Requested ${requestedCollabId}`);
  });

  return (
    <Router>
    <header className="navbar navbar-expand navbar-dark fixed-top bg-dark">
      <div className="navbar-brand"><Link to={`/?collab_id=${currentCollab}`} className={classes.plainLink}>
        EBRAINS Neuromorphic Computing Service: Job Manager
        </Link></div>
      <div className="ml-auto order-lg-last">
        <ul className="navbar-nav flex-row">
          <li className="nav-item pr-3 pr-lg-0">
            <div className="nav-link"><Link to="/new" className={classes.plainLink}>+</Link></div>
          </li>
        </ul>
      </div>
    </header>
    <Switch>
      <Route exact path="/">
          <JobList auth={props.auth} collab={currentCollab} setCollab={setCurrentCollab} />
      </Route>
      <Route path="/new">
          <CreateJob auth={props.auth} collab={currentCollab}  setCollab={setCurrentCollab} />
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
