import { Fragment, useState, useContext } from "react";
import { Link as RouterLink, useSubmit } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Button,
  ButtonGroup,
  Toolbar as MUIToolbar,
  Typography,
} from "@mui/material";

import CreateJobDialog from "./CreateJobDialog";
import RequestedCollabContext from "../RequestedCollabContext";

function renderButtons(page, collab, createNewJob) {
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
            <Button color="inherit" variant="outlined" onClick={createNewJob}>
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
            <Button color="inherit" variant="outlined" onClick={createNewJob}>
              New job
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
  const [newJobDialogOpen, setNewJobDialogOpen] = useState(false);
  const submit = useSubmit();
  const requestedCollabId = useContext(RequestedCollabContext);

  const handleOpenNewJobDialog = () => {
    setNewJobDialogOpen(true);
  };

  const handleCloseNewJobDialog = (newJob) => {
    if (newJob) {
      newJob.collab = props.collab;
      console.log(newJob);
      submit(newJob, {
        method: "post",
        encType: "application/json",
        action: `/${props.collab}/jobs/`,
        navigate: true,
      });
    }
    setNewJobDialogOpen(false);
  };

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
          {renderButtons(props.page, props.collab, handleOpenNewJobDialog)}
        </MUIToolbar>
      </AppBar>
      <CreateJobDialog
        open={newJobDialogOpen}
        onClose={handleCloseNewJobDialog}
        collab={props.collab}
      />
    </Fragment>
  );
}

export default Toolbar;
