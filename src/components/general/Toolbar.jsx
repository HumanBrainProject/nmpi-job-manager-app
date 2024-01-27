import { Fragment, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Button,
  ButtonGroup,
  Toolbar as MUIToolbar,
  Typography,
} from "@mui/material";

import { RequestedCollabContext } from "../../context";

function renderButtons(page, collab) {
  switch (page) {
    case "jobs":
      return (
        <Fragment>
          <Typography variant="body2" color="inherit" noWrap sx={{ mr: 1 }}>
            {collab}
          </Typography>
          <ButtonGroup>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={`/${collab}/projects/`}
            >
              Quotas
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={`/${collab}/jobs/new`}
            >
              New job
            </Button>
          </ButtonGroup>
        </Fragment>
      );
    case "job-detail":
      return (
        <Fragment>
          <Typography variant="body2" color="inherit" noWrap sx={{ mr: 1 }}>
            {collab}
          </Typography>
          <ButtonGroup>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={`/${collab}/jobs/`}
            >
              Jobs
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={`/${collab}/projects/`}
            >
              Quotas
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={`/${collab}/jobs/new`}
            >
              New job
            </Button>
          </ButtonGroup>
        </Fragment>
      );
    case "create":
      return (
        <Fragment>
          <Typography variant="body2" color="inherit" noWrap sx={{ mr: 1 }}>
            {collab}
          </Typography>
          <ButtonGroup>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={`/${collab}/projects/`}
            >
              Quotas
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={`/${collab}/jobs/`}
            >
              Jobs
            </Button>
          </ButtonGroup>
        </Fragment>
      );
    case "projects":
      return (
        <Fragment>
          <Typography variant="body2" color="inherit" noWrap sx={{ mr: 1 }}>
            {collab}
          </Typography>
          <ButtonGroup>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={`/${collab}/jobs/`}
            >
              Jobs
            </Button>
          </ButtonGroup>
        </Fragment>
      );
    default:
      return "";
  }
}

function getHomeURL(requestedCollabId) {
  if (requestedCollabId) {
    return `/?clb-collab-auth=${requestedCollabId}`;
  } else {
    return "/";
  }
}

function Toolbar(props) {
  const requestedCollabId = useContext(RequestedCollabContext);

  return (
    <Fragment>
      <AppBar
        position="relative"
        sx={{
          backgroundImage: "linear-gradient(to right, #00395d, #5cc766)",
        }}
      >
        <MUIToolbar>
          <Avatar sx={{ mr: 2 }} alt="EBRAINS" src="/favicon.png" />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, textDecoration: "none" }}
            component={RouterLink}
            to={getHomeURL(requestedCollabId)}
          >
            EBRAINS Neuromorphic Computing Service: Job Manager
          </Typography>
          {renderButtons(props.page, props.collab)}
        </MUIToolbar>
      </AppBar>
    </Fragment>
  );
}

export default Toolbar;
