/*
Copyright 2021 CNRS

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";
import axios from "axios";
import { MdSearch, MdAddCircle, MdRefresh } from "react-icons/md";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import LoopOutlinedIcon from "@material-ui/icons/LoopOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CodeIcon from "@material-ui/icons/Code";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import StorageIcon from "@material-ui/icons/Storage";

//const resultsUrl = 'https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db.json';
//const resultsUrl = 'https://nmpi.hbpneuromorphic.eu/api/v2/results/?collab_id=neuromorphic-testing-private';
const baseUrl = "https://nmpi.hbpneuromorphic.eu/api/v2/results/?collab_id=";
const baseQueueUrl = "https://nmpi.hbpneuromorphic.eu/api/v2/queue/?collab_id=";
// url used to get collabs' ids
const baseGlobalUrl = "https://validation-v2.brainsimulation.eu";

/*const useStyles = makeStyles((theme) => ({

  spinIcon: { spin: false,

  },

}));
*/

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0b6623",
    },
    secondary: {
      main: red[500],
    },
    running: {
      main: yellow[500],
    },
  },
});

function isInCollab() {
  const isParent = window.opener == null;
  const isIframe = window !== window.parent;
  return isIframe && isParent;
}

function CollabSelector(props) {
  if (!isInCollab()) {
    return (
      <Autocomplete
        id="Collab-list"
        options={props.collabList}
        getOptionLabel={(option) => option}
        defaultValue={props.collab}
        onChange={(event, newValue) => {
          props.onCollabChange(newValue);
        }}
        style={{ width: 300, display: "inline-block" }}
        renderInput={(params) => <TextField {...params} label="Collab List" variant="outlined" />}
        autoHighlight={true}
      />
    );
  } else {
    return "";
  }
}

class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      provJobList: [],
      tagList: [],
      error: "",
      authToken: props.auth.token,
      refreshState: false,
      refreshDate: "",
      collabList: [],
    };
  }

  getTagsList = async () => {
    const tagsUrl = baseUrl + "tags/?collab_id=" + this.props.collab;
    const config = { headers: { Authorization: "Bearer " + this.state.authToken } };
    await axios
      .get(tagsUrl, config)
      .then((res) => {
        console.log(res);
        // this.setState({jobs: response.data.objects});
        let availableTags = [];
        res.data.objects.forEach((tag) => {
          console.log(tag.name);
          availableTags.push(tag.name);
        });
        availableTags.sort();
        console.log(availableTags);
        this.setState({
          tagList: availableTags.map(String),
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });

    console.log("---taglist?---", this.tagList);
  };

  getCollabList = async () => {
    const url = baseGlobalUrl + "/projects";
    const config = { headers: { Authorization: "Bearer " + this.state.authToken } };
    await axios
      .get(url, config)
      .then((res) => {
        let editableProjects = [];
        res.data.forEach((proj) => {
          if (proj.permissions.UPDATE) {
            editableProjects.push(proj.project_id);
          }
        });
        editableProjects.sort();
        this.setState({
          collabList: editableProjects.map(String),
        });
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
  };

  fetchData = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + this.state.authToken,
      },
    };
    let resultsUrl = baseUrl + this.props.collab;
    let queueUrl = baseQueueUrl + this.props.collab;

    let currentdate = new Date();
    let fetchDataDate =
      "Last updated: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    await axios
      .get(resultsUrl, config)
      .then((response) => {
        let initial_list = [];
        console.log(response);
        this.setState({ provJobList: initial_list.concat(response.data.objects) });
        var mydate = new Date(response.data.objects.date);
        var date = mydate.toString("jj/MM/yyyy");
        console.log("date : " + date);
        this.setState({ date: date });
        // this.state.jobs.map(job => {
        //   handleTags(job, this.tagList)
        // })
        console.log(this.state.date);
        this.setState({ refreshState: false });
        this.setState({ refreshDate: fetchDataDate });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });

    await axios
      .get(queueUrl, config)
      .then((response) => {
        console.log(response);
        console.log("queue response");
        this.setState({ provJobList: this.state.provJobList.concat(response.data.objects) });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });
    console.log(this.state.jobs);
    console.log(this.state.provJobList);
    const sortedJobs = []
      .concat(this.state.provJobList)
      .sort((a, b) => parseFloat(b.id) - parseFloat(a.id));

    this.setState({ jobs: sortedJobs });
  };

  onCollabChange = async (newValue) => {
    // setState is asynchronous, i added await
    await this.props.setCollab(newValue);
    if (newValue) {
      this.fetchData();
    }
  };

  async componentDidMount() {
    //this.setState({authToken: this.props.auth.token});
    await this.getCollabList();
    if (this.props.collab) {
      await this.fetchData();
    }

    console.log(this.state.collabList);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <div style={{ height: 80, marginLeft: "1%", marginTop: "1%", position: "relative" }}>
            <CollabSelector
              collabList={this.state.collabList}
              collab={this.props.collab}
              onCollabChange={this.onCollabChange}
            />
          </div>
          <div className="row-fluid">
            <div className="col-md-12">
              <table className="table table-striped table-condensed">
                <thead>
                  <tr>
                    <th width="120 px">
                      <Tooltip title="Create job">
                        <Link to="/new">
                          <MdAddCircle />
                        </Link>
                      </Tooltip>
                      <Tooltip title="Reload Jobs">
                        <Button
                          onClick={() => {
                            this.fetchData();
                            this.setState({ refreshState: true });
                          }}
                          color="primary "
                        >
                          {" "}
                          <FontAwesomeIcon
                            icon={faRedo}
                            color="#007bff"
                            onClick={() => {}}
                            spin={this.state.refreshState === true ? true : false}
                          />
                        </Button>
                      </Tooltip>
                    </th>

                    <th>ID</th>
                    <th>
                      <DoneAllIcon /> Status
                    </th>
                    <th>
                      <StorageIcon /> System
                    </th>
                    <th>
                      {" "}
                      <CodeIcon /> Code{" "}
                    </th>
                    <th>
                      {" "}
                      <ScheduleIcon /> Submitted on{" "}
                    </th>
                    <th>
                      {" "}
                      <AccountCircleIcon /> Submitted by{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.jobs.map((job) => (
                      // if(this.state.jobs.tags==this.selectedTag){
                      <tr>
                        <td>
                          {" "}
                          <Link to={"/" + job.id}>
                            {" "}
                            <MdSearch />
                          </Link>
                        </td>
                        <td>{job.id}</td>

                        <td>
                          <div>
                            {job.status === "finished" ? (
                              <Chip
                                avatar={
                                  <Avatar>
                                    <CheckCircleOutlineIcon />
                                  </Avatar>
                                }
                                label={job.status}
                                color="primary"
                              />
                            ) : job.status === "error" ? (
                              <Chip
                                avatar={
                                  <Avatar>
                                    <ErrorOutlineIcon />
                                  </Avatar>
                                }
                                label={job.status}
                                color="secondary"
                              />
                            ) : (
                              <Chip
                                avatar={
                                  <Avatar style={{ backgroundColor: "#dbc300", color: "white" }}>
                                    <LoopOutlinedIcon />
                                  </Avatar>
                                }
                                label={job.status}
                                style={{ backgroundColor: "#dbc300", color: "white" }}
                              />
                            )}
                          </div>
                        </td>
                        <td>{job.hardware_platform}</td>
                        <td>
                          <code>{job.code.substring(0, 50) + "..."}</code>
                        </td>
                        <td>
                          {String(job.timestamp_submission).slice(0, 4) +
                            "/" +
                            String(job.timestamp_submission).slice(5, 7) +
                            "/" +
                            String(job.timestamp_submission).slice(8, 10) +
                            " " +
                            String(job.timestamp_submission).slice(11, 19)}
                        </td>
                        <td>{job.user_id}</td>
                      </tr>
                    ))
                    // }
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div
            color="gray"
            style={{ position: "relative", bottom: 0, paddingLeft: "20px", paddingBottom: "20px" }}
          >
            {this.state.refreshDate}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default JobList;
