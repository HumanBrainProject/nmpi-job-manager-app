import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  useParams
} from "react-router-dom";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import * as Mui from '@material-ui/core';
// import Prism, { highlight } from "prismjs";
// import hljs from 'highlight.js';
// https://openbase.com/js/react-syntax-highlighter
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/railscasts.css" />
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,

    
  },
  root1: {
    width: '100%',
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
 const isDefined = job.output_data;
  return(
    <div>
      <h2>Job {id}</h2>
        <div>
        <p>
          <span className={job.status === 'finished' ? 'badge badge-success' : 'badge badge-danger'}>{job.status}</span>
        </p>
        <p>
          <small >
            Submitted on {job.timestamp_submission} by {job.user_id} to <strong >{job.hardware_platform}</strong>
          </small>
          <br></br>
          <small >
            Completed on {job.timestamp_completion}
          </small>
        </p>


        <ExpansionPanel defaultExpanded='true' color='red'>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} color='red'>
          <Typography className={classes.heading} color='red'>Code</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails  color='red'>
          <Typography>
          <SyntaxHighlighter language="Python" style={docco}>
          {String(job.code)}
        </SyntaxHighlighter>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>


      <ExpansionPanel defaultExpanded='true' color='red'>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} color='red'>
        <Typography className={classes.heading} color='red'>Command</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  color='red'>
        <Typography>
        <SyntaxHighlighter language="Shell" style={docco}>
        {String(job.command)}
      </SyntaxHighlighter>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>


    <ExpansionPanel defaultExpanded='true' color='red'>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} color='red'>
        <Typography className={classes.heading} color='red'>Hardware Platform</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  color='red'>
        <Typography>

        {String(job.hardware_platform)}

        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>

    <ExpansionPanel defaultExpanded='true' color='red'>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} color='red'>
        <Typography className={classes.heading} color='red'>Log</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  color='red'>


        {job.log}


      </ExpansionPanelDetails>
    </ExpansionPanel>



    <ExpansionPanel defaultExpanded='true' color='red'>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} color='red'>
        <Typography className={classes.heading} color='red'>Provenance</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  color='red'>


        {job.Provenance}


      </ExpansionPanelDetails>
    </ExpansionPanel>

    <ExpansionPanel defaultExpanded='true' color='red'>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} color='red'>
        <Typography className={classes.heading} color='red'>Output files</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  color='red'>
      {isDefined!=='undefined'? (
      <a href= {String(job.output_data[0].url)} > {String(job.output_data[0].url)} </a> ) : ('undefined')}
      


      </ExpansionPanelDetails>
    </ExpansionPanel>




      </div>
    </div>
  );
}

export default JobDetail;