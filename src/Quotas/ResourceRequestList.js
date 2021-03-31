import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import ResourceRequestDialog from "./ResourceRequestDialog";

const baseUrl = "https://quotas.hbpneuromorphic.eu/";

// note that "Project" and "Resource request" mean more-or-less the same thing:
//  a Project is an accepted resource request.

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function fetchResourceRequests(collabId, auth) {
  const config = {
    headers: {
      Authorization: "Bearer " + auth.token,
    },
  };
  const resourceRequestListUrl = `${baseUrl}projects/?collab=${collabId}`;
  return axios.get(resourceRequestListUrl, config);
}

function saveResourceRequest(resourceRequest, collabId, auth, submit) {
  const config = {
    headers: {
      Authorization: "Bearer " + auth.token,
    },
  };
  if (submit) {
    resourceRequest.submitted = true;
  }
  if (resourceRequest.context) {
    // previously saved
    const resourceRequestUpdateUrl = `${baseUrl}${resourceRequest.resource_uri}`;
    axios.put(resourceRequestUpdateUrl, resourceRequest, config);
    console.log(`Updated ${resourceRequestUpdateUrl}`);
    console.log(resourceRequest);
  } else {
    // new
    resourceRequest.owner = auth.tokenParsed["preferred_username"];
    resourceRequest.context = uuidv4();
    resourceRequest.collab = collabId;
    const resourceRequestCreateUrl = `${baseUrl}projects/`;
    axios.post(resourceRequestCreateUrl, resourceRequest, config);
    console.log("Created new resource request");
    console.log(resourceRequest);
  }
}

function QuotaView(props) {
  const q = props.quota;
  return (
    <span>
      {`${q.platform}: ${Number.parseFloat(q.usage).toPrecision(2)} of ${q.limit} (${q.units})`};{" "}
    </span>
  );
}

function QuotasView(props) {
  if (props.quotas) {
    return props.quotas.map((quota) => {
      return <QuotaView quota={quota} />;
    });
  } else {
    return "";
  }
}

function ResourceRequestList(props) {
  const [resourceRequests, setResourceRequests] = useState([{}]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedResourceRequestIndex, setSelectedResourceRequestIndex] = useState(0);
  const [currentlySelected, setCurrentlySelected] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetchResourceRequests(props.collab, props.auth)
      .then((response) => {
        setResourceRequests(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedResourceRequestIndex]);

  const handleClick = (event, index) => {
    console.log(`Clicked ${resourceRequests[index].context}`);
    setSelectedResourceRequestIndex(index);
    setCurrentlySelected(resourceRequests[index]);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleChange = (updatedResourceRequest, submit) => {
    let updatedResourceRequests = [...resourceRequests];
    let localIndex = selectedResourceRequestIndex;
    if (localIndex < 0) {
      localIndex = resourceRequests.length;
      setSelectedResourceRequestIndex(localIndex);
      updatedResourceRequests.push(updatedResourceRequest);
    }
    if (updatedResourceRequests[localIndex].status === "in preparation") {
      // ensure we don't over-write submitted/approved requests
      if (submit) {
        updatedResourceRequest.status = "under review";
      }
      updatedResourceRequests[localIndex] = updatedResourceRequest;
      setResourceRequests(updatedResourceRequests);
      saveResourceRequest(updatedResourceRequest, props.collab, props.auth, submit);
    }
  };

  const handleCreate = () => {
    setSelectedResourceRequestIndex(-1);
    setCurrentlySelected(null);
    setDialogOpen(true);
  };

  return (
    <div className={classes.root}>
      <h3>Resource requests for '{props.collab}'</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="resource request table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Abstract</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Quotas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceRequests.map((rr, index) => (
              <TableRow key={rr.context} hover onClick={(event) => handleClick(event, index)}>
                <TableCell component="th" scope="row">
                  {rr.title}
                </TableCell>
                <TableCell>{rr.status}</TableCell>
                <TableCell>{rr.abstract}</TableCell>
                <TableCell>{rr.owner}</TableCell>
                <TableCell>
                  <QuotasView quotas={rr.quotas} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={handleCreate}
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        New request
      </Button>

      <ResourceRequestDialog
        resourceRequest={currentlySelected}
        open={dialogOpen}
        onClose={handleClose}
        onChange={handleChange}
      />
    </div>
  );
}

export default ResourceRequestList;
