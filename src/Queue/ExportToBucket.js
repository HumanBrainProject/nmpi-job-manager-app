import React from "react";
import { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { jobQueueServer } from "../globals";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "auto",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ExportToBucket(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [existingFiles, setExistingFiles] = useState([]);
  const [oversizeFiles, setOversizeFile] = useState([]);
  const [allfiles, setAllFiles] = useState(true);
  const [size_error, setError] = useState(false);
  const [collabType, setCollabType] = React.useState("group");
  const [refreshRepoContent, setRefreshRepoContent] = React.useState(0);

  const [FolderContent, setFolderContent] = React.useState({});
  const [currentDir, setcurrentDir] = React.useState("/" + props.collab);
  const [addDetail, setaddDetails] = React.useState(" (current Collab)");

  const handleCloseResult = () => {
    setOpenResult(false);
    setAllFiles(true);
    setOversizeFile([]);
    setExistingFiles([]);
  };

  const handleCopy = async (path) => {
    let target = "EBRAINS Bucket";
    const url = `${jobQueueServer}/jobs/${props.jobId}/output_data`;
    const config = {
      headers: { Authorization: "Bearer " + props.auth.token },
    };

    const response = await axios.put(url, { repository: target, files: [] }, config);
    props.setOpenAlertCopy(false);
    props.setOpenAlertDone(true);
    // for (let i = 0; i < response.data[1].length; i++) {
    //   if (response.data[1][i] !== "Copied") {
    //     setAllFiles(false);
    //     if (response.data[1][i] === "Exists") {
    //       existingFiles.push(response.data[0][i]);
    //     } else {
    //       setError(true);
    //       oversizeFiles.push([response.data[0][i], parseFloat(response.data[1][i][1]).toFixed(2)]);
    //       props.setOpenAlertDone(false);
    //       props.setOpenAlertSize(true);
    //     }
    //   }
    //}
    console.log(response);
    setOpenResult(true);
  };

  useEffect(() => {
    setRefreshRepoContent(refreshRepoContent + 1);
    if (refreshRepoContent === 1) {
      setcurrentDir("/" + props.collab);
      setaddDetails(" (current Collab)");
    }
  }, [open]);

  useEffect(() => {
    if (props.copy2bucket == true) {
      handleCopy(props.collab);
      props.setOpenAlertCopy(true);
    }
  }, [props.copy2bucket]);

  return (
    <div className="ExportToBucket">
      <Dialog
        open={openResult}
        onClose={handleCloseResult}
        maxWidth="xl"
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h3>Copy output files to the collab's Bucket </h3>
          <hr></hr>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h4>
              Target repository <strong>/job_{props.jobId}</strong> in the{" "}
              <a href={`https://wiki.ebrains.eu/bin/view/Collabs/${props.collab}/Bucket`}>Bucket</a>{" "}
              of collab <strong>{props.collab}</strong>
            </h4>
            <br></br>
          </DialogContentText>
          {(() => {
            if (allfiles) {
              return (
                <DialogContentText id="alert-dialog-description2">
                  <h5>All output files have been copied to the Bucket.</h5>
                </DialogContentText>
              );
            } else {
              return (
                <DialogContentText id="alert-dialog-description3">
                  <h5> Copy done, except: </h5>
                </DialogContentText>
              );
            }
          })()}
          {(() => {
            if (existingFiles.length >= 1) {
              const listItems1 = existingFiles.map((f) => (
                <li>{f} : already exists in the Bucket</li>
              ));
              return (
                <DialogContentText id="alert-dialog-description4">
                  <ul>{listItems1}</ul>
                </DialogContentText>
              );
            }
          })()}
          {(() => {
            if (oversizeFiles.length >= 1) {
              const listItems2 = oversizeFiles.map((f) => (
                <li>
                  {f[0]} : the size ({f[1]} GB) exceeds the limit allowed of 1GB
                </li>
              ));
              return (
                <DialogContentText id="alert-dialog-description5">
                  <ul>{listItems2}</ul>
                </DialogContentText>
              );
            }
          })()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResult} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
