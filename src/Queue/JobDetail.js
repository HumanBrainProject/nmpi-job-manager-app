import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  useParams
} from "react-router-dom";
//import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import * as Mui from '@material-ui/core';
import Prism from "prismjs";
import hljs from 'highlight.js';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    textAlign: "left",
    //backgroundColor: theme.palette.background.paper,
  },
  boxStyle: {

  textAlign: "left",

  },
}));
function JobDetail(props) {
  let { id } = useParams();
  const[job, setJob] = useState({});

  useEffect(() => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + props.auth.token,
      }
    }
    // const resultUrl = `https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db_${id}.json`;
    const resultUrl = `https://nmpi.hbpneuromorphic.eu/api/v2/results/${id}/?collab_id=neuromorphic-testing-private`;

    const fetchData = async () => {
      const result = await axios(resultUrl, config);
      setJob(result.data);
      console.log(result.data);
    };
    fetchData();
  }, []);
  const classes = useStyles();
  return(
    <div>
      <h2>Job {id}</h2>
        <div>
        <p>
          <span className={job.status === 'finished' ? 'badge badge-success' : 'badge badge-danger'}>{job.status}</span>
        </p>
        <p>
          <small class="ng-binding">
            Submitted on {job.timestamp_submission} by {job.user_id} to <strong class="ng-binding">{job.hardware_platform}</strong>
          </small>
          <br></br>
          <small class="ng-binding">
            ompleted on {job.timestamp_completion}
          </small>
        </p>



            <Mui.Button component="span"className={classes.root}   variant="contained" color="primary">Code</Mui.Button>
            <Mui.Box component="span"className={classes.boxStyle}  boxShadow={0} display="block">
            <pre>
            <code  class="Python">
            
            {job.code}
            </code>
          </pre>
          </Mui.Box>
            <Mui.Box component="span" boxShadow={3} display="block">Command</Mui.Box>
            <pre>
            <code>
            {job.command}
            </code>
          </pre>


          <Mui.Box component="span" boxShadow={3} display="block">Hardware Platform</Mui.Box>
          <pre>
          <code>
          {job.hardware_platform}
          </code>
        </pre>
        <Mui.Box component="span" boxShadow={3} display="block">Log</Mui.Box>
        <pre>
        <code>
        {job.log}
        </code>
      </pre>

      <Mui.Box component="span" boxShadow={3} display="block">Provenance</Mui.Box>
      <pre>
      <code>
      {job.Provenance}
      </code>
    </pre>

    <Mui.Grid container  spacing={2}>
    <Mui.Grid item xs={12}>
      <Mui.Grid container justify="center" >
        {[0, 1, 2].map((value) => (
          <Mui.Grid key={value} item>
            <Mui.Paper  />
          </Mui.Grid>
        ))}
      </Mui.Grid>
    </Mui.Grid>
    </Mui.Grid>

      </div>
    </div>
  );
}

export default JobDetail;