import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  useParams
} from "react-router-dom";
//import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
//import * as Mui from '@material-ui/core';
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
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';

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
    //fontWeight: theme.typography.fontWeightRegular,
    fontWeight: 'bold',
    

    
  },
  expansion_panel_details:{
   
    backgroundColor:'#f8f8ff',
    fontFamily:'Futura',
    'font-size': '16px',

  },
  expansion_panel_summary:{
    margin: {right:2},
    fontStyle: 'bold',
    fontFamily:'Helvetica',
    backgroundColor:'#ebe3ed',

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

  return(
    <div>
      <h2> Job {id} </h2>
        <div>
        <p>
          <span className={job.status === 'finished' ? 'badge badge-success' : 'badge badge-danger'}>{job.status}</span>
        </p>
        <p>
          <small >
            Submitted on <strong >{String(job.timestamp_submission).slice(0,10)+" "+String(job.timestamp_submission).slice(11,19)}</strong> by <strong >{job.user_id}</strong> to <strong >{job.hardware_platform}</strong>
          </small>
          <br></br>
          <small >
            Completed on <strong> {String(job.timestamp_completion).slice(0,10)+" "+String(job.timestamp_completion).slice(11,19)}</strong>
          </small>
        </p>


        <ExpansionPanel defaultExpanded='true' >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
          <Typography className={classes.heading}>Output files</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansion_panel_details}>
        {(job.output_data && job.output_data.length>0)? (<a href= {String(job.output_data[0].url)} > {String(job.output_data[0].url)} </a>)
          : ('No files available')}
  
  
        </ExpansionPanelDetails>
      </ExpansionPanel>





        <ExpansionPanel defaultExpanded='true' >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
          <Typography className={classes.heading} color='red'>Code</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails  color='red' className={classes.expansion_panel_details}>
          <Typography>
          <SyntaxHighlighter language="python" style={docco}>
          {String(job.code)}
        </SyntaxHighlighter>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>


      <ExpansionPanel defaultExpanded='true' >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
        <Typography className={classes.heading} color='red'>Command</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  className={classes.expansion_panel_details}>
        <Typography>
        <SyntaxHighlighter language="bash" style={docco}>
        {String(job.command)}
      </SyntaxHighlighter>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>


    <ExpansionPanel defaultExpanded='true'>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
        <Typography className={classes.heading} color='red'>Hardware Config</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  className={classes.expansion_panel_details}>
        

        {"Platform: "+job.hardware_platform}
        <br></br>
        {"Ressource allocation ID: "}
        {(job.hardware_config)? (job.hardware_config.resource_allocation_id) : ("Undefined")}

        
      </ExpansionPanelDetails>
    </ExpansionPanel>

    


    <ExpansionPanel defaultExpanded='true' >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
        <Typography className={classes.heading} color='red'>Provenance</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  className={classes.expansion_panel_details}>
      
      {(job.provenance) ?
        ("Machine's IP : "+job.provenance.spinnaker_machine) : ("No details")
      }


      </ExpansionPanelDetails>
    </ExpansionPanel>

    <ExpansionPanel defaultExpanded='true' >
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary} >
      <Typography className={classes.heading} color='red'>Log</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={classes.expansion_panel_details}>


      {job.log}


    </ExpansionPanelDetails>
  </ExpansionPanel>



      </div>
    </div>
  );
}

export default JobDetail;