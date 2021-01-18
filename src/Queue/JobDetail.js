import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  useParams
} from "react-router-dom";
//import { Button } from '@material-ui/core';
import * as Mui from '@material-ui/core';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
                Completed on {job.timestamp_completion}
              </small>
            </p>


            <Mui.Box component="span" boxShadow={3} display="block">Code</Mui.Box>
            
            <pre>
            <code>
            
            {job.code}
            </code>
          </pre>
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


          </div>
    </div>
  );
}

export default JobDetail;