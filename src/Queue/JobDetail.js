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
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/railscasts.css" />
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CodeIcon from '@material-ui/icons/Code';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import StorageIcon from '@material-ui/icons/Storage';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import DescriptionIcon from '@material-ui/icons/Description';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LaunchIcon from '@material-ui/icons/Launch';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {apiV2Url} from '../Globals';
import {timeFormat} from '../Utils';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0b6623',
    },
    secondary: {
      main: red[500],
    },
    running: {
      main: yellow[500],
    },
  },
  });
const useStyles = makeStyles((theme) => ({

  root: {
    margin: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    //fontWeight: theme.typography.fontWeightRegular,
    fontWeight: '550',
    



  },
  expansion_panel_details:{

    backgroundColor:'#f8f8ff',
    fontFamily:'Futura',
    'font-size': '14px',

  },
  expansion_panel_summary:{
    margin: {right:2},
    fontStyle: 'bold',
    fontFamily:'Helvetica',
    backgroundColor:'#f2f2f2',

  },

}));


function JobDetail(props) {
  let { id } = useParams();
  const [job, setJob] = useState({});
  const [log, setLog] = useState(null);

  useEffect(() => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + props.auth.token,
      }
    }
    // const resultUrl = `https://raw.githubusercontent.com/jonathanduperrier/nmpi-job-manager-app-reactjs/master/db_${id}.json`;
    const resultUrl = apiV2Url +`results/${id}`;

    const fetchData = async () => {
      const result = await axios(resultUrl, config);
      await setJob(result.data);
      console.log(result.data);
    };
    fetchData();
  }, []);
  const classes = useStyles();

  const getLog = async (jobId) => {
    const logUrl = apiV2Url + `/log/${jobId}`;
    const config = {headers: {'Authorization': 'Bearer ' + props.auth.token}};
    return axios.get(logUrl, config)
  };

  const handleOpenLog = async (event, expanded) => {
    if (expanded) {
      if (log === null) {
        getLog(id)
        .then(res => {
          setLog(res.data.content);
        })
        .catch(err => {
          console.log("error getting log");
        })
      }
    }
  };

  return(
    <ThemeProvider theme={theme}>
      
    <div style={{marginBottom:"2%",marginTop:"1%"}}>
    
      
        <div style={{marginLeft:"1%",marginRight:"2%",}}>
        
        <Paper elevation={3} style={{paddingLeft:"1%", paddingBottom:"0.1%",width:"22%",marginBottom:"1%"}} >
        <Box component="span" display="block" fontSize="h4.fontSize"  fontWeight="fontWeightMedium">Job {id}</Box>

        <p>
        <div>
        {job.status === 'finished' ? <Chip avatar={<Avatar><CheckCircleOutlineIcon /></Avatar>} label="Finished" 
          color="primary"  /> :job.status === 'error' 
        ? (  <Chip avatar={<Avatar><ErrorOutlineIcon /></Avatar>} label={job.status} 
          color="secondary" /> ) :
          (  <Chip avatar={<Avatar style={{backgroundColor:'#dbc300' , color:'white'}}><LoopOutlinedIcon /></Avatar>} label={job.status} 
             style={{backgroundColor:'#dbc300', color:'white'}}  /> ) }
      </div>
      
        </p>

        <p>

        <Box hover="true" component="span" display="block" fontSize="13px"  > Submitted on <strong >{timeFormat(job.timestamp_submission)}</strong> by <strong >{job.user_id}</strong> to <strong >{job.hardware_platform}</strong>
        </Box>
        
        <Box component="span" display="block" fontSize="13px"  > Completed on <strong> {timeFormat(job.timestamp_completion)}</strong></Box>
  
        </p>

        </Paper>

        

        <ExpansionPanel defaultExpanded={true} >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
          <Typography className={classes.heading}><DescriptionIcon /> Output files</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansion_panel_details}>
        {(job.output_data && job.output_data.length>0)? ( job.output_data.map((out_file,index) =><Box component="span" display="block"> <AttachFileIcon /> <a href= {String(out_file.url)} > {"Output file "+(index+1)} </a> </Box>))
          : ('No files available')}


        </ExpansionPanelDetails>
      </ExpansionPanel>





        <ExpansionPanel defaultExpanded={true} >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
          <Typography className={classes.heading} > <CodeIcon /> Code</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails   className={classes.expansion_panel_details}>
          <Typography>
          <SyntaxHighlighter language="python" style={docco}>
          {String(job.code)}
        </SyntaxHighlighter>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>


      <ExpansionPanel defaultExpanded={true} >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
        <Typography className={classes.heading} >     <LaunchIcon /> Command</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  className={classes.expansion_panel_details}>
 
        <Typography>
        <SyntaxHighlighter language="bash" style={docco}>
        {String(job.command)}
      </SyntaxHighlighter>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>


    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
        <Typography className={classes.heading} ><StorageIcon /> Hardware Config</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  className={classes.expansion_panel_details}>
      <List component="nav" aria-label="mailbox folders">
      <ListItem Box>
      <Box component="div" display="inline" width="300px">Platform:</Box>
<Box component="div" display="inline">{job.hardware_platform} </Box>
 
      </ListItem>

      <ListItem Box>
      <Box component="div" display="inline" width="300px">Ressource allocation ID:</Box>
      <Box component="div" display="inline">{(job.hardware_config)? (job.hardware_config.resource_allocation_id) : ("Undefined")} </Box>
      </ListItem>
      </List>



        
      </ExpansionPanelDetails>
    </ExpansionPanel>

    


    <ExpansionPanel defaultExpanded={true} >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary}>
        <Typography className={classes.heading} ><LocationOnIcon />Provenance</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails  className={classes.expansion_panel_details}>
      <Box component="div" display="inline" width="300px" style={{paddingLeft:"15px"}}>Machine's IP :</Box>
      <Box component="div" display="inline">{(job.provenance) ?
        (String(job.provenance.spinnaker_machine)) : ("No details")
      }</Box>



      </ExpansionPanelDetails>
    </ExpansionPanel>

    <ExpansionPanel defaultExpanded={false} onChange={handleOpenLog} >
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.expansion_panel_summary} >
      <Typography className={classes.heading} >Log</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={classes.expansion_panel_details}>


      <pre>{log}</pre>


    </ExpansionPanelDetails>
  </ExpansionPanel>



      </div>
    </div>
    </ThemeProvider>
  );
}

export default JobDetail;