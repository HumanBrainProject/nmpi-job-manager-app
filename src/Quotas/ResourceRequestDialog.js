import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function ResourceRequestForm(props) {
  const classes = useStyles();

  const [resourceRequest, setResourceRequest] = useState({});

  const handleClose = () => {
    props.onClose();
  };

  const handleChange = (event, fieldName) => {
    let updatedResourceRequest = { ...resourceRequest };
    updatedResourceRequest[fieldName] = event.target.value;
    setResourceRequest(updatedResourceRequest);
  };

  const handleSave = () => {
    props.onChange(resourceRequest, false);
    props.onClose();
  };

  const handleSubmit = () => {
    props.onChange(resourceRequest, true);
    props.onClose();
  };

  useEffect(() => {
    console.log(props.resourceRequest);
    if (props.resourceRequest) {
      setResourceRequest(props.resourceRequest);
    } else {
      setResourceRequest({
        title: "",
        abstract: "",
        description: "",
        context: "",
        collab: "",
        owner: "",
        status: "in preparation",
      });
    }
  }, [props.resourceRequest]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="resource-request-dialog-title"
      open={props.open}
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogTitle id="resource-request-dialog-title">
        Editing <i>{resourceRequest.title}</i>
      </DialogTitle>
      <DialogContent>
        <form className={classes.root}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={resourceRequest.title}
            onChange={(event) => handleChange(event, "title")}
          />
          <TextField
            id="abstract"
            label="Summary"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={resourceRequest.abstract}
            onChange={(event) => handleChange(event, "abstract")}
          />
          <TextField
            id="description"
            label="Full description of project"
            variant="outlined"
            multiline
            rows={10}
            fullWidth
            value={resourceRequest.description}
            onChange={(event) => handleChange(event, "description")}
            helperText="Full description is not required for test quotas"
          />
          <div>
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="default"
              className={classes.button}
              endIcon={<SaveIcon />}
            >
              Save changes
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon />}
            >
              Submit request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ResourceRequestDialog(props) {
  const classes = useStyles();
  const { onClose, resourceRequest, open, onChange } = props;

  const handleClose = () => {
    onClose();
  };

  if (resourceRequest === null || resourceRequest.status === "in preparation") {
    return (
      <ResourceRequestForm
        onClose={onClose}
        resourceRequest={resourceRequest}
        open={open}
        onChange={onChange}
      />
    );
  } else {
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="resource-request-dialog-title"
        open={open}
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle id="resource-request-dialog-title">{resourceRequest.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{resourceRequest.abstract}</DialogContentText>
          <DialogContentText>{resourceRequest.description}</DialogContentText>
          <DialogContentText>
            <b>ID:</b> {resourceRequest.context}
            <b> Owner:</b> {resourceRequest.owner}
            <b> {resourceRequest.start_date ? "Start date:" : ""}</b> {resourceRequest.start_date}
            <b> Status:</b> {resourceRequest.status}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default ResourceRequestDialog;
