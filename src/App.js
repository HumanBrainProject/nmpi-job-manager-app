import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import "./App.css";
import JobList from "./Queue/JobList.js";
import JobDetail from "./Queue/JobDetail.js";
import CreateJob from "./Queue/CreateJob.js";
import ResourceRequestList from "./Quotas/ResourceRequestList.js";

const useStyles = makeStyles((theme) => ({
  plainLink: {
    color: "white",
  },
}));

function App(props) {
  //console.log(props.auth.tokenParsed);
  const classes = useStyles();

  const [currentCollab, setCurrentCollab] = React.useState(null);

  React.useEffect(() => {
    let params = new URL(document.location).searchParams;
    let requestedCollabId = params.get("clb-collab-id");
    if (requestedCollabId) {
      setCurrentCollab(requestedCollabId);
    }
    console.log(`Requested ${requestedCollabId}`);
  }, [currentCollab]);

  return (
    <Router>
      <header className="navbar navbar-expand navbar-dark fixed-top bg-dark">
        <div data-testid="job-manager-link" className="navbar-brand">
          <Link
            to={`/?clb-collab-id=${currentCollab}`}
            style={{ textDecoration: "none" }}
            className={classes.plainLink}
          >
            EBRAINS Neuromorphic Computing Service: Job Manager
          </Link>
        </div>
        <div className="ml-auto order-lg-last">
          <ul className="navbar-nav flex-row">
            <li className="nav-item pr-3 pr-lg-0">
              <div className="nav-link">
                <Link to={`/?clb-collab-id=${currentCollab}`} className={classes.plainLink}>
                  Jobs
                </Link>
              </div>
            </li>
            <li className="nav-item pr-3 pr-lg-0">
              <div className="nav-link">
                <Link to="/resources" className={classes.plainLink}>
                  Quotas
                </Link>
              </div>
            </li>
            <li className="nav-item pr-3 pr-lg-0">
              <div className="nav-link">
                <Link to="/new" className={classes.plainLink}>
                  +
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </header>
      <Switch>
        <Route exact path="/">
          <JobList auth={props.auth} collab={currentCollab} setCollab={setCurrentCollab} />
        </Route>

        <Route path="/new">
          <CreateJob auth={props.auth} collab={currentCollab} setCollab={setCurrentCollab} />
        </Route>
        <Route path="/:id/resubmit">
          <CreateJob
            auth={props.auth}
            collab={currentCollab}
            setCollab={setCurrentCollab}
            resubmit="true"
          />
        </Route>
        <Route path="/resources">
          <ResourceRequestList auth={props.auth} collab={currentCollab} />
        </Route>
        <Route path="/:id">
          <JobDetail auth={props.auth} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
